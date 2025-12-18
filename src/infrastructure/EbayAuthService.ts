import axios from "axios";


export class EbayAuthService {
    private static token: string | null = null;
    private static expiresAt = 0;

    static async getAccessToken(): Promise<string> {
        

        if (this.token && Date.now() < this.expiresAt) {
            return this.token;
        }

        const credentials = Buffer.from(
            `${process.env.EBAY_CLIENT_ID}:${process.env.EBAY_CLIENT_SECRET}`
        ).toString("base64");

        const response = await axios.post(
            "https://api.ebay.com/identity/v1/oauth2/token",
            "grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope",
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${credentials}`,
                },
            }
        );

        this.token = response.data.access_token;
        this.expiresAt = Date.now() + response.data.expires_in * 1000;

        if (this.token !== null){
            return this.token;
        }else{
            return "";
        }

    }
}