// /api/getContent.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "GET") {
    try {
      // Retrieve the data from Redis
      const cachedData = await redis.get("webflow:content");

      if (cachedData) {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
        res.setHeader("Access-Control-Allow-Origin", "*"); // Replace '*' with your domain for security
        res.status(200).send(cachedData);
      } else {
        res.status(503).json({ error: "Content not available" });
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
