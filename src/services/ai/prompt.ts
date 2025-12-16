
export const TEXT_TO_JSON_PROMPT = (userMessage: string) => [
  {
    role: "user",
    parts: [
      {
        text: `You are an AI shopping assistant.
Your task is to convert the user's shopping request into STRICT JSON only.

Rules:
- Output ONLY valid JSON
- Do NOT include explanations
- Do NOT include markdown
- If a field is unknown, set it to null

JSON schema:
{
  "query": string,
  "category": string | null,
  "filters": {
    "min_price": number | null,
    "max_price": number | null,
    "brand": string | null,
    "color": string | null
  }
}

User request:
"${userMessage}"`
      }
    ]
  }
];

export const IMAGE_TO_JSON_PROMPT = [
  {
    role: "user",
    parts: [
      {
        text: `You are an AI that analyzes product images.

Return STRICT JSON only using this schema:
{
  "query": string,
  "category": string | null,
  "filters": {
    "brand": string | null,
    "color": string | null
  }
}

Rules:
- No markdown
- No explanation
- JSON only`
      }
    ]
  }
];
