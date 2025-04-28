import { genkit } from "genkit";
import { groq } from "genkitx-groq";
import { googleAI } from "@genkit-ai/googleai";
import { startFlowServer } from "@genkit-ai/express";
import dotenv from "dotenv";
dotenv.config();

/* Flow start */
import { defineMemeFlow } from "./flows/memeFlow";
import { defineJokeFlow } from "./flows/joekFlow";
import { defineGreetFlow } from "./flows/greetFlow";
import { defineGFFlow } from "./flows/gfFlow";
/* Flow ends */

/* Genkit declaration */
export const ai = genkit({
  plugins: [
    groq({
      apiKey: process.env.qroq_api,
    }),
    googleAI({ apiKey: process.env.google_api }),
  ],
  promptDir: "src/prompts",
});

const memeFlow = defineMemeFlow(ai);
const jokeFlow = defineJokeFlow(ai);
const GreetFlow = defineGreetFlow(ai);
const AIGFFlow = defineGFFlow(ai);

startFlowServer({
  flows: [jokeFlow, memeFlow, GreetFlow, AIGFFlow],
});
