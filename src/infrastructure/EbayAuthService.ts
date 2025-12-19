import axios from "axios";
export class EbayAuthService {
    private static token: string | null = null;
    private static expiresAt = 0;

    static async getAccessToken(): Promise<string> {
        // Check if existing token is still valid
        if (this.token && Date.now() < this.expiresAt) {
            return this.token;
        }

        console.log("🔄 Fetching new eBay token...");

        const credentials = Buffer.from(
            `${process.env.EBAY_CLIENT_ID}:${process.env.EBAY_CLIENT_SECRET}`
        ).toString("base64");

        // Use URLSearchParams to safely encode the body
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");
        // FIX: Always use api.ebay.com for the scope string, even in sandbox
        params.append("scope", "https://api.ebay.com/oauth/api_scope");

        try {
            const response = await axios.post(
                "https://api.sandbox.ebay.com/identity/v1/oauth2/token",
                params.toString(),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Basic ${credentials}`,
                    },
                }
            );

            this.token = response.data.access_token;
            // Set expiry with a 60-second buffer for safety
            this.expiresAt = Date.now() + (response.data.expires_in - 60) * 1000;

            if (!this.token) {
                throw new Error("eBay returned an empty access token");
            }

            return this.token;
        } catch (error: any) {
            console.error("❌ eBay Auth Error:", error.response?.data || error.message);
            throw new Error("Failed to authenticate with eBay");
        }
    }
}