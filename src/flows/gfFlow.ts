import { ai } from "..";
import { Genkit, z } from "genkit";

/* Ai Girl Friend */

export const defineGFFlow = (ai: Genkit) =>
  ai.defineFlow(
    {
      name: "Ai GF",
      inputSchema: z.object({
        name: z.string(),
        message: z.string(),
      }),
      outputSchema: z.string(),
    },
    async (input) => {
      const GFPrompt = ai.prompt("gf");
      const res = await GFPrompt({
        name: input.name,
        message: input.message,
      });
      return res.text;
    }
  );
