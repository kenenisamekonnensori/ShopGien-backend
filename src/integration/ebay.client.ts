
import { createHttpClient } from "./httpClient";
import { EbayAuthService } from "../infrastructure/EbayAuthService";

const EBAY_BASE_URL = "https://api.sandbox.ebay.com/buy/browse/v1";

let ebayClientInstance: ReturnType<typeof createHttpClient> | null = null;
let tokenExpiry = 0;
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

export async function getEbayClient(){
  const now = Date.now();

  if (!ebayClientInstance || now > tokenExpiry-300000){
    console.log("Fetching new eBay token...");

    const tokenData = await EbayAuthService.getAccessToken();
    
      ebayClientInstance = createHttpClient({
      baseURL: EBAY_BASE_URL,
      headers: {
        Authorization: `Bearer ${tokenData}`,
        "Content-Type": "application/json",
      },
    });
    tokenExpiry = now + 3600000; // assuming token valid for 1 hour

  }

  return ebayClientInstance!;



// export function getEbayClient() {
//   if (!ebayClientInstance) {
//     throw new Error("Ebay client not initialized. Call initEbayClient first.");
//   }
//   return ebayClientInstance;
// }

// const token = await EbayAuthService.getAccessToken();

// export const ebayClient = createHttpClient({

//   baseURL: EBAY_BASE_URL,
//   headers: {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json",
//   },
// });
}
