import { Genkit, z } from "genkit";

/* Greet Prompt */
export const defineGreetFlow = (ai: Genkit) =>
  ai.defineFlow(
    {
      name: "GreetFlow",
      inputSchema: z.object({
        location: z.string(),
        style: z.string(),
        name: z.string(),
      }),
      outputSchema: z.string(),
    },
    async (input) => {
      // Load the prompt by filename (without the .prompt extension)
      const GreetPrompt = ai.prompt("greet");

      // Execute the prompt with the string value from input.topic
      const llmResponse = await GreetPrompt({
        location: input.location,
        name: input.name,
        style: input.style,
      }); // Pass the string directly

      // Return the generated text
      return llmResponse.text;
    }
  );
