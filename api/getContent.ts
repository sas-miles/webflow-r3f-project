import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const allowedOrigins = ["https://full-r3f.webflow.io"];

export default async (req: VercelRequest, res: VercelResponse) => {
  const origin = req.headers.origin;

  const safeOrigin = origin || "null";
  if (allowedOrigins.includes(safeOrigin)) {
    res.setHeader("Access-Control-Allow-Origin", safeOrigin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "null");
  }

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(204).end();
    return;
  }

  const { collectionId, itemId } = req.query;

  if (!collectionId || !itemId) {
    return res.status(400).json({ error: "Missing collectionId or itemId" });
  }

  if (req.method === "GET") {
    try {
      const cacheKey = `webflow:${collectionId}:${itemId}`;
      const cachedData = await redis.get(cacheKey);

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
