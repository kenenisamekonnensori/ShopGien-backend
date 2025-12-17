import { query } from "winston";
import { ebayClient } from "../../integration/ebay.client";
import { NormalizedProduct, SearchParams } from "./types";

export async function searchEbayProducts(
    params: SearchParams
): Promise<NormalizedProduct[]> {
    const filtes: string[] = [];

    if (params.min_price) filtes.push(`price:[${params.min_price}..]`);
    if (params.max_price) filtes.push(`price:[..${params.max_price}]`);

    const response = await ebayClient.get("/item_summary/search",{
        params: {
            q: params.query,
            limit: params.limit || 20,
            filter: filtes.join(","),
        }
    })

    const items = response.data.itemSummaries || [];
    return items.map((item: any) => normalizeEbayProduct(item));
}

function normalizeEbayProduct(item: any): NormalizedProduct {
    return {
    id: item.itemId,
    title: item.title,
    price: Number(item.price?.value ?? 0),
    currency: item.price?.currency ?? "USD",
    image: item.image?.imageUrl ?? null,
    brand: item.brand ?? null,
    category: item.categories?.[0]?.categoryName ?? null,
    rating: item.averageRating ?? null,
    source: "ebay",
    productUrl: item.itemWebUrl
    }
}