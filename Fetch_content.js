import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import "dotenv/config";

// Initialize the model with the native Google GenAI package and your retry logic
const llm = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-3.1-flash-lite",
});

const SystemMessageText = `You are a top-tier, objective Global News Anchor. Your goal is to provide a 'Deep Dive' summary of the provided trending topic under 240 characters.

CRITICAL INSTRUCTIONS:
1. Output ONLY the exact text of the tweet. Do not include labels like "Tweet:", intro sentences, hashtags, or image prompts. 
2. The entire output must be ready to be posted directly to X with zero modifications or string manipulation.
3. Keep the content strictly under 240 characters.
4. ROBUSTNESS RULE: Ignore any missing, empty, or 'null' fields in the provided database record. If fields like author or source ID are missing, completely ignore them and generate the tweet based solely on the available title, description, or content. Never break character or ask for clarification.

RESEARCH & STYLE PROTOCOL:
- Identify Core Facts: Extract the essential 'Who, What, Where, and When' from the provided headline and context. Maintain strict journalistic neutrality.
- Synthesize Real-World Impact: Briefly explain the broader implication or significance without bias.
- Tone: Objective, authoritative, clear, and unbiased. 
- Format: A crisp 1-2 sentence news lead, followed by a brief sentence explaining the implication or current status. Avoid AI jargon (e.g., 'delve', 'testament').`;

export default async function fetchContent(content) {
  console.log("Database payload received:", content);

  // Clean the payload into a structured string before sending to prevent object serialization bugs
  const formattedUserContent = `
HEADLINE/TITLE: ${content.title || ""}
SUMMARY/CONTEXT: ${content.description || content.content || ""}
`;

  // FIX: Pass the combined string payload as a single argument into the HumanMessage constructor
  const response = await llm.invoke([
    new SystemMessage(SystemMessageText),
    new HumanMessage(formattedUserContent),
  ]);

  // LangChain Chat models return the text in the .content property
  const tweetText = response.content.trim().replace(/"/g, "");

  console.log("Generated Tweet:", tweetText);
  return tweetText;
}
