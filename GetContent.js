import "dotenv/config";
import { MongoClient } from "mongodb";
import fetchContent from "./Fetch_content.js";
import GenerateImage from "./GenerateImage.js";
import thoughts from "./Generate_Random_Content.js";

const mongoClient = new MongoClient(process.env.MONGO_URI);

async function GetContent() {
  try {
    //throw new Error("Default fallback!!!");

    await mongoClient.connect();
    const db = mongoClient.db("twitter_bot");
    const trends = db.collection("trends");

    const trendItem = await trends.findOneAndDelete(
      {},
      { sort: { createdAt: -1 } },
    );

    if (!trendItem) {
      console.log(
        "No trends found in database. Firing default fallback content loop.",
      );
    }

    const response = await fetchContent(trendItem);
    const status = await GenerateImage(response.promptTest);

    return { text: response.tweetTest, status: status };
  } catch (e) {
    console.error("Error inside GetContent:", e);
    // Safe fallbacks to keep the script from crashing upstream
    const currentThough = thoughts();
    const status = await GenerateImage(currentThough.prompt);
    return {
      text: currentThough.text,
      status: status
    };
  } finally {
    await mongoClient.close();
  }
}

export default GetContent;
