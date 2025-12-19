
import { geminiGenerateContent } from "../../integration/gemeni.client";
import { IMAGE_TO_JSON_PROMPT } from "./prompt";
export interface ImageSearchQuery {
  query: string;
  category: string | null;
  filters: {
    brand: string | null;
    color: string | null;
  };
}

export async function imageToJson(imageUrl: string): Promise<ImageSearchQuery> {
  const response = await geminiGenerateContent([
    ...IMAGE_TO_JSON_PROMPT,
    {
      role: "user",
      parts: [{
        fileData: {
          fileUri: imageUrl,
          mimeType: "image/jpeg"
        }
      }]
    }
  ]);

  const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error("Gemini returned empty response for image");
  }

  try {
    return JSON.parse(rawText) as ImageSearchQuery;
  } catch (error) {
    throw new Error("Failed to parse Gemini image JSON response");
  }
}
