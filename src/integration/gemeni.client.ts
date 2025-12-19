
import { createHttpClient } from "./httpClient";
import { env } from "../config/env";
import { GoogleGenerativeAI, SchemaType, Schema } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

const responseSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    query: { type: SchemaType.STRING, description: "The core search query" },
    category: { type: SchemaType.STRING, nullable: true },
    filters: {
      type: SchemaType.OBJECT,
      properties: {
        min_price: { type: SchemaType.NUMBER, nullable: true },
        max_price: { type: SchemaType.NUMBER, nullable: true },
        brand: { type: SchemaType.STRING, nullable: true },
        color: { type: SchemaType.STRING, nullable: true },
      },
      required: ["min_price", "max_price", "brand", "color"],
    },
  },
  required: ["query", "category", "filters"],
};

export const gemeniModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are a shopping assistant. Extract search parameters from user messages.",

  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: responseSchema,
  }
})








// const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta";

// export const geminiClient = createHttpClient({
//   baseURL: GEMINI_BASE_URL,
// });

// export async function geminiGenerateContent(prompt: any) {
//   const response = await geminiClient.post(
//     `/gemini-1.5-flash:generate?key=${env.GEMINI_API_KEY}`,
//     {
//       contents: prompt,
//     }
//   );

//   return response.data;
// }

