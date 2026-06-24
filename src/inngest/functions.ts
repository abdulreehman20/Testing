// src/inngest/functions.ts
import { inngest } from "./client";

export const processTask = inngest.createFunction(
  { id: "process-task", triggers: { event: "app/task.created" } },
  async ({ event, step }) => {
    const result = await step.run("handle-task", async () => {
      return { processed: true, id: event.data.id };
    });

    await step.sleep("pause", "1s");

    return { message: `Task ${event.data.id} complete`, result };
  },
);

// // src/inngest/functions.ts
// import { createOpenRouter } from "@openrouter/ai-sdk-provider";
// import { generateText } from "ai";
// import { inngest } from "./client";

// const openrouterApiKey = process.env.OPENROUTER_API_KEY;

// if (!openrouterApiKey) {
//   throw new Error("OPENROUTER_API_KEY is not set");
// }

// const openrouter = createOpenRouter({
//   apiKey: openrouterApiKey,
// });

// export const processTask = inngest.createFunction(
//   { id: "demo-generate-text", triggers: { event: "demo/generate-text" } },
//   async ({ step }) => {
//     await step.run("generate-text", async () => {
//       return await generateText({
//         model: openrouter.chat("openrouter/free"),
//         prompt: "Write a python hello world program.",
//       });
//     });
//   },
// );
