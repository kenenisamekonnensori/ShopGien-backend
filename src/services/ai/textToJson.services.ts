import { geminiGenerateContent } from "../../integration/gemeni.client";
import { TEXT_TO_JSON_PROMPT } from "./prompt";
export interface TextSearchQuery {
  query: string;
  category: string | null;
  filters: {
    min_price: number | null;
    max_price: number | null;
    brand: string | null;
    color: string | null;
  };
}

export async function textToJson(userMessage: string): Promise<TextSearchQuery> {
  const response = await geminiGenerateContent(
    TEXT_TO_JSON_PROMPT(userMessage)
  );

  const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error("Gemini returned empty response");
  }

  try {
    return JSON.parse(rawText) as TextSearchQuery;
  } catch (error) {
    throw new Error("Failed to parse Gemini JSON response");
  }
}
