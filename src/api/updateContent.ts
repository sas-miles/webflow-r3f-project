// /api/updateContent.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Redis } from "@upstash/redis";
import fetch from "node-fetch";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "POST") {
    try {
      // Fetch data from Webflow API
      const response = await fetch(
        `https://api.webflow.com/collections/{collection_id}/items`,
        {
          headers: {
            Authorization: `Bearer ${process.env.WEBFLOW_API_KEY}`,
            "accept-version": "1.0.0",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Webflow API error: ${response.statusText}`);
      }

      const data = await response.json();

      // Store the data in Redis
      await redis.set("webflow:content", JSON.stringify(data));

      // Respond to the webhook
      res.status(200).send("Content updated");
    } catch (error) {
      console.error("Error updating content:", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
