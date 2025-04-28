import { z, Genkit } from "genkit";
import { llama4MScout17b } from "genkitx-groq";

const memeSchema = z.object({
  subject: z.string(),
});

export const defineMemeFlow = (aiInstance: Genkit) => {
  // Pass the Genkit instance

  /* meme Prompt definition - Defined within the function context */
  const memePrompt = aiInstance.definePrompt(
    // Use the passed aiInstance
    {
      model: llama4MScout17b,
      name: "memePrompt",
      input: { schema: memeSchema },
      output: { format: "text" },
      config: { temperature: 0.5 },
    },
    `make a meme about {{subject}}`
  );
  /* Meme Flow definition - Defined within the function context */
  return aiInstance.defineFlow(
    // Use the passed aiInstance
    {
      name: "memeFlow",
      inputSchema: memeSchema,
      outputSchema: z.string(),
    },
    async (input) => {
      const res = await memePrompt({
        // Use the defined prompt
        subject: input.subject,
      });
      return res.text;
    }
  );
};
