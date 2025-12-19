import {SchemaType, Schema } from "@google/generative-ai";
import { ca } from "zod/v4/locales";

export const responseSchema: Schema = {
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

export const imageResponseSchema: Schema = {
    type: SchemaType.OBJECT,
    properties: {
        query: { type: SchemaType.STRING, description: "A descriptive search query based on the image"},
        category: { type: SchemaType.STRING, nullable: true },
        filters: {
            type: SchemaType.OBJECT,
            properties: {
                brand: { type: SchemaType.STRING, nullable: true },
                color: { type: SchemaType.STRING, nullable: true },
            },
            required: ["brand", "color"]
        }
    },
    required: ["query", "category", "filters"]
};



