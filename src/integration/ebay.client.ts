
import { createHttpClient } from "./httpClient";
import { env } from "../config/env";

const EBAY_BASE_URL = "https://api.ebay.com/buy/browse/v1";

export const ebayClient = createHttpClient({
  baseURL: EBAY_BASE_URL,
  headers: {
    Authorization: `Bearer ${env.EBAY_OAUTH_TOKEN}`,
    "Content-Type": "application/json",
  },
});

