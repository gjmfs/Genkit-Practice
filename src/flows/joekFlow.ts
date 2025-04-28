import { Genkit, z } from "genkit";
import { llama4MScout17b } from "genkitx-groq";

/* Joke Flow */
export const defineJokeFlow = (ai: Genkit) =>
  ai.defineFlow(
    {
      name: "jokeFlow",
      inputSchema: z.string(),
      outputSchema: z.string(),
    },
    async (subject) => {
      const response = await ai.generate({
        prompt: `make a joke about ${subject}`,
        model: llama4MScout17b,
      });
      return response.text;
    }
  );
