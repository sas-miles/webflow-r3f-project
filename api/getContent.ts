// /api/getContent.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// List of allowed origins
const allowedOrigins = ["https://full-r3f.webflow.io"];

export default async (req: VercelRequest, res: VercelResponse) => {
  // Get the origin of the request
  const origin = req.headers.origin;

  const safeOrigin = origin || "null";
  if (allowedOrigins.includes(safeOrigin)) {
    res.setHeader("Access-Control-Allow-Origin", safeOrigin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "null");
  }

  if (req.method === "OPTIONS") {
    // Handle preflight OPTIONS request
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(204).end();
    return;
  }

  if (req.method === "GET") {
    try {
      // Retrieve the data from Redis
      const cachedData = await redis.get("webflow:content");

      if (cachedData) {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
        res.status(200).send(cachedData);
      } else {
        res.status(503).json({ error: "Content not available" });
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.setHeader("Allow", "GET, OPTIONS");
    res.status(405).send("Method Not Allowed");
  }
};
