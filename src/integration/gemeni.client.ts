
import { createHttpClient } from "./httpClient";
import { env } from "../config/env";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { imageResponseSchema, responseSchema } from "./responseSchema";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);


export const gemeniModel = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview",
  systemInstruction: "You are a shopping assistant. Extract search parameters from user messages.",

  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: responseSchema,
  }
})

export const gemeniModelImage = genAI.getGenerativeModel(
  {
    model: "gemini-2.5-flash-image",
    systemInstruction: "You are an expert shopping assistant. Analyze the provided image and extract product details into structured JSON.",

    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: imageResponseSchema,
    },
  },
  {apiVersion: "v1beta"}
);








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

