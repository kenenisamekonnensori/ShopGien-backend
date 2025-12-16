
import { createHttpClient } from "./httpClient";
import { env } from "../config/env";

const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta";

export const geminiClient = createHttpClient({
  baseURL: GEMINI_BASE_URL,
});

export async function geminiGenerateContent(prompt: any) {
  const response = await geminiClient.post(
    `/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
    {
      contents: prompt,
    }
  );

  return response.data;
}

