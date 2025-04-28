import { z, genkit } from "genkit";
import { groq, llama4MScout17b } from "genkitx-groq";
import { googleAI, gemini20Flash } from "@genkit-ai/googleai";
import { startFlowServer } from "@genkit-ai/express";
import dotenv from "dotenv";

/*prompt files*/

dotenv.config();

const memeSchema = z.object({
  subject: z.string(),
});
/* Genkit declaration */
const ai = genkit({
  plugins: [
    groq({
      apiKey: process.env.api,
    }),
    googleAI({ apiKey: process.env.googleapi }),
  ],
  promptDir: "prompts",
});

/* Greet Prompt */

export const GreetFlow = ai.defineFlow(
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

/* Joke Flow */
export const jokeFlow = ai.defineFlow(
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

/* meme Prompt */
const memePrompt = ai.definePrompt(
  {
    model: llama4MScout17b,
    name: "memePrompt",
    input: { schema: memeSchema },
    output: { format: "text" },
    config: { temperature: 0.5 },
  },
  `make a meme about {{subject}}`
);
/* Meme Flow */
export const memeFlow = ai.defineFlow(
  {
    name: "memeFlow",
    inputSchema: memeSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const res = await memePrompt({
      subject: input.subject,
    });
    return res.text;
  }
);
/* Ai Girl Friend */

export const AIGFFlow = ai.defineFlow(
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

startFlowServer({
  flows: [jokeFlow, memeFlow, GreetFlow],
});
