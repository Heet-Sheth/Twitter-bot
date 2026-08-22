import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import thoughts from './Generate_Random_Content.js';
import "dotenv/config";

const llm = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-3.1-flash-lite",
});

const SystemMessageText = `You are a brilliant, highly cynical, and witty late-night news anchor. Your goal is to provide a sharp, sarcastic 1-2 sentence commentary on the provided trending headline under 240 characters, accompanied by a satirical image prompt.

CRITICAL INSTRUCTIONS:
1. Deliver a punchy, ironic, or sarcastic hook based entirely on the specific facts of the article. Avoid generic sitcom jokes or cliché opening phrases like "Because of course..." or "In other news...".
2. Keep the tweet content strictly under 240 characters so users can read and digest the underlying news story instantly.
3. ROBUSTNESS RULE: Ignore any missing, empty, or 'null' fields in the data. Generate the text based solely on the available headline, description, or content. Never break character.
4. OUTPUT FORMAT CONSTRAINT: You must separate the tweet text and the image prompt using the exact delimiter: ***

EXACT OUTPUT FORMAT:
[Your exact tweet text goes here]
***
[Your descriptive image prompt goes here]`;

export default async function fetchContent(content) {
  if (!content) {
    const currentThough = thoughts();
    return {
      tweetTest: currentThough.text,
      promptTest: currentThough.prompt,
    };
  }

  const response = await llm.invoke([
    new SystemMessage(SystemMessageText),
    new HumanMessage(content),
  ]);

  const rawText = response.content ? response.content.trim() : "";

  let tweetTest;
  let promptTest;

  if (rawText.includes("***")) {
    const parts = rawText.split("***");
    tweetTest = parts[0].trim().replace(/"/g, "");
    promptTest = parts[1].trim();
  } else {
    const currentThough = thoughts();
    tweetTest = currentThough.text;
    promptTest = currentThough.prompt;
  }

  return { tweetTest, promptTest };
}
