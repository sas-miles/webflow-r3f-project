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
      // Log when the function starts processing
      console.log("Processing Webflow API request...");

      // Fetch data from Webflow API
      const response = await fetch(
        `https://api.webflow.com/v2/collections/67117b2ed6ce0b4be535a00c/items/6712cd8187ee8f16ad401b72`,
        {
          headers: {
            Authorization: `Bearer ${process.env.WEBFLOW_API_KEY}`,
            "accept-version": "2.0.0",
          },
        },
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `Webflow API error: ${response.status} - ${errorMessage}`,
        );
      }

      const data = await response.json();

      // Set a TTL for Redis (1 hour in this case)
      const ttlInSeconds = 3600;
      await redis.set("webflow:content", JSON.stringify(data), {
        ex: ttlInSeconds,
      });

      // Log when the data is successfully cached
      console.log("Content successfully updated in Redis");

      // Respond to the webhook
      res.status(200).send("Content updated");
    } catch (error) {
      // Log any error that occurs during the process
      console.error("Error updating content:", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
