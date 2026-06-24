// Post localhost:3000/api/ai

import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";

const openrouterApiKey = process.env.OPENROUTER_API_KEY;

if (!openrouterApiKey) {
  throw new Error("OPENROUTER_API_KEY is not set");
}

const openrouter = createOpenRouter({
  apiKey: openrouterApiKey,
});

export async function POST() {
  const response = await generateText({
    model: openrouter.chat("openrouter/free"),
    prompt: "What is OpenRouter?",
  });

  console.log(response.text);

  return Response.json(response);
}
