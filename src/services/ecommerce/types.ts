
export interface NormalizedProduct {
    id: string;
    title: string;
    price: number;
    currency: string;
    image: string | null;
    brand: string | null;
    category: string | null;
    rating: number | null;
    source: "ebay" | "amazon" | "walmart" | "shopify";
    productUrl: string;
};

export interface SearchParams {
    query: string;
    min_price?: number;
    max_price?: number;
    brand?: string;
    limit?: number;
};