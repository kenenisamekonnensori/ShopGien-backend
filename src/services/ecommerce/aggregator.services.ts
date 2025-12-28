import { searchEbayProducts } from "./ebay.service";
import { NormalizedProduct, SearchParams } from "./types";


export async function searchProducts(
    params: SearchParams
): Promise<NormalizedProduct[]> {
    const [ebayResults] = await Promise.all([
        searchEbayProducts(params),
    ])

    return ebayResults;
}

export async function getProductById(
    id: String
): Promise<NormalizedProduct | null>{
    return null;
} 
