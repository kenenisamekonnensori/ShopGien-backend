
import { createHttpClient } from "./httpClient";
import { env } from "../config/env";
import { EbayAuthService } from "../infrastructure/EbayAuthService";

const EBAY_BASE_URL = "https://api.ebay.com/buy/browse/v1";

let ebayClientInstance: ReturnType<typeof createHttpClient> | null = null;

export async function initEbayClient() {
  const token = await EbayAuthService.getAccessToken();

  ebayClientInstance = createHttpClient({
    baseURL: EBAY_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export function getEbayClient() {
  if (!ebayClientInstance) {
    throw new Error("Ebay client not initialized. Call initEbayClient first.");
  }
  return ebayClientInstance;
}

// const token = await EbayAuthService.getAccessToken();

// export const ebayClient = createHttpClient({

//   baseURL: EBAY_BASE_URL,
//   headers: {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json",
//   },
// });

