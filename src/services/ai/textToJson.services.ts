import { gemeniModel } from "../../integration/gemeni.client";
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


  const result = await gemeniModel.generateContent(userMessage);
  const response = result.response;
  const text = response.text();

  try {
    return JSON.parse(text) as TextSearchQuery;
  } catch (error) {
    throw new Error("Failed to parse Gemini JSON response");
  }
}
