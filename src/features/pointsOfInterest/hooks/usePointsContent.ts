import { useEffect } from "react";
import { useWebflowStore } from "~/shared/store/webflowStore";
import { fetchWebflowData } from "~/shared/api/webflowAPI";
import type { PointOfInterest } from "../types";

export const usePointContent = (poi: PointOfInterest) => {
  const { contentMap, error, isLoading, setContent, setError, setIsLoading } =
    useWebflowStore();

  useEffect(() => {
    const fetchContent = async () => {
      if (contentMap.has(poi.id)) return;

      setIsLoading(true);
      try {
        const data = await fetchWebflowData(poi.collectionId, poi.id);
        setContent(poi.id, data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load content");
        console.error("Error fetching POI content:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [poi.id, poi.collectionId]);

  return {
    content: contentMap.get(poi.id),
    isLoading,
    error,
  };
};
