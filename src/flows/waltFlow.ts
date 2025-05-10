import { z, Genkit } from "genkit";
import { gemini20Flash } from "@genkit-ai/googleai";
import { menuTool } from "../tools/menuTool";
import { orderTool } from "../tools/orderTool";

export const MenuQuestionInputSchema = z.object({
  question: z.string(),
});

// Fix: Return the defined prompt and call menuTool with the ai instance
export const dataMenuDefineFlow = (ai: Genkit) => {
  const dataMenuPrompt = ai.definePrompt(
    {
      name: "dataMenu",
      model: gemini20Flash,
      input: { schema: MenuQuestionInputSchema },
      output: { format: "text" },
      tools: [menuTool(ai), orderTool(ai)], // Call the menuTool function with the ai instance
    },
    `You are acting as a helpful AI assitant named Walt that can answer question about the food on the menu at Walt's Burgers.

    Answer this customer's question, in a concise and helpful manner, as long as it is about food on the menu or something harmless like sports.
    Use the tools available to answer food and menu questions. Do not Invent items not on the menu.

    Question:{{question}}
    `
  );

  return ai.defineFlow(
    {
      name: "waltFlow",
      inputSchema: MenuQuestionInputSchema,
      outputSchema: z.string(),
    },
    async (input) => {
      const res = await dataMenuPrompt({
        question: input.question,
      });
      return res.text;
    }
  );
};
