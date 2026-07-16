import fs from "fs/promises";

export default async function GenerateImage(prompt) {
  try {
    console.log("Generating visual media for prompt:", prompt);

    // Clean string format to map perfectly inside standard URL paths
    const cleanPrompt = encodeURIComponent(prompt);
    const url = `https://image.pollinations.ai/p/${cleanPrompt}?width=1024&height=1024&nologo=true`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    await fs.writeFile('image.png', Buffer.from(arrayBuffer));
    return 0;
  }
  catch (error) {
    console.error("Error in GenerateImage:", error);
    return 1;
  }
}