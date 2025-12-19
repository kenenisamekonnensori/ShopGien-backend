
import { file } from "zod";
import { gemeniModelImage } from "../../integration/gemeni.client";
import { IMAGE_TO_JSON_PROMPT } from "./prompt";
export interface ImageSearchQuery {
  query: string;
  category: string | null;
  filters: {
    brand: string | null;
    color: string | null;
  };
}

/**
 * @param fileUri - The URI returned from GoogleAIFileManager
 */

export async function imageToJson(fileUri: string): Promise<ImageSearchQuery> {
  // const response = await geminiGenerateContent([
  //   ...IMAGE_TO_JSON_PROMPT,
  //   {
  //     role: "user",
  //     parts: [{
  //       fileData: {
  //         fileUri: imageUrl,
  //         mimeType: "image/jpeg"
  //       }
  //     }]
  //   }
  // ]);

  // const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text;

  // if (!rawText) {
  //   throw new Error("Gemini returned empty response for image");
  // }

  const prompt = "Identify the product in this image and extract its attributes.";

  const result = await gemeniModelImage.generateContent([
    {text: prompt},
    {
      fileData: {
        fileUri: fileUri,
        mimeType: "image/jpeg"
      }
    }
  ]);
  
  try {
    const text = result.response.text();
    return JSON.parse(text) as ImageSearchQuery;
  } catch (error) {
    throw new Error("Failed to parse Gemini image JSON response");
  }
}
