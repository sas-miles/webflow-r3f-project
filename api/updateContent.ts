import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Redis } from "@upstash/redis";
import fetch from "node-fetch";
import { POINTS_OF_INTEREST } from "../src/features/pointsOfInterest/lib/poiConfig";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

async function fetchAndCacheWebflowContent(
  collectionId: string,
  itemId: string,
) {
  console.log(
    `Fetching content for collection: ${collectionId}, item: ${itemId}`,
  );

  const response = await fetch(
    `https://api.webflow.com/v2/collections/${collectionId}/items/${itemId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.WEBFLOW_API_KEY}`,
        "accept-version": "2.0.0",
      },
    },
  );

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Webflow API error: ${response.status} - ${errorMessage}`);
  }

  const data = await response.json();
  const cacheKey = `webflow:${collectionId}:${itemId}`;

  await redis.set(cacheKey, JSON.stringify(data), {
    ex: 3600, // 1 hour TTL
  });

  console.log(`Cached content for: ${cacheKey}`);
  return data;
}

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "POST") {
    try {
      console.log("Processing Webflow API request for all POIs...");

      // Process each POI from your config
      const results = await Promise.all(
        POINTS_OF_INTEREST.map(async (poi) => {
          try {
            const data = await fetchAndCacheWebflowContent(
              poi.collectionId,
              poi.id,
            );
            return {
              name: poi.name,
              status: "success",
              data,
            };
          } catch (error) {
            console.error(`Error fetching content for ${poi.name}:`, error);
            return {
              name: poi.name,
              status: "error",
              error: error instanceof Error ? error.message : "Unknown error",
            };
          }
        }),
      );

      const success = results.filter((r) => r.status === "success").length;
      const failed = results.filter((r) => r.status === "error").length;

      console.log(
        `Content update complete. Success: ${success}, Failed: ${failed}`,
      );

      res.status(200).json({
        message: "Content update complete",
        results,
      });
    } catch (error) {
      console.error("Error in webhook handler:", error);
      res.status(500).json({
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
