import { imageToJson } from "../services/ai/imageToJson.services";
import { textToJson } from "../services/ai/textToJson.services";
import { searchProducts } from "../services/ecommerce/aggregator.services";
import { NormalizedProduct } from "../services/ecommerce/types";


export interface SearchResult {
    query: unknown;
    products: NormalizedProduct[];
}

export class SearchUseCase {
    static async searchByText(message: string): Promise<SearchResult> {
        
        const aiQuery = await textToJson(message);

        const products = await searchProducts({
            query: aiQuery.query,
            min_price: aiQuery.filters.min_price ?? undefined,
            max_price: aiQuery.filters.max_price ?? undefined,
            brand: aiQuery.filters.brand ?? undefined,
            limit: 20,
        })

        return {query: aiQuery, products};

    
    }

    static async searchByImage(imageUrl: string): Promise<SearchResult> {

        const aiQuery = await imageToJson(imageUrl);

        const products = await searchProducts({
            query: aiQuery.query,
            brand: aiQuery.filters.brand ?? undefined,
            limit: 20,
        });

        return {query: aiQuery, products};
    }
}