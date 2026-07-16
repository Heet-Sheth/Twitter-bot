import "dotenv/config";
import { TwitterApi } from "twitter-api-v2";
import GetContent from "./GetContent.js";
import { stat } from "fs";

const client = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_SECRET,
  bearerToken: process.env.X_BEARER,
});

export default async function Twitter_Post() {
  try {
    const { text, status } = await GetContent();
    const rwClient = client.readWrite;

    let mediaId

    if (status === 0) {
      mediaId = await rwClient.v1.uploadMedia('./image.png');
      console.log("Image uploaded...");
    }

    const postingObject = { text: text };

    if (status == 0) postingObject.media = { media_ids: [mediaId] };

    const response = await rwClient.v2.tweet(postingObject);

    console.log("Successfully posted to X:", response.data);
    return 0;
  } catch (e) {
    console.error("Critical error in Twitter_Post:", e);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

Twitter_Post();
