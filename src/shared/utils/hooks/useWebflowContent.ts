import { useEffect } from "react";
import { useWebflowStore } from "~/shared/zustandStore/webflowStore";
import { fetchWebflowData, cacheWebflowData } from "~/shared/api/webflowAPI";

export const useWebflowContent = () => {
  const { content, error, isLoading, setContent, setError, setIsLoading } =
    useWebflowStore();

  useEffect(() => {
    const loadContent = async () => {
      // Check cache first
      const cachedContent = localStorage.getItem("webflowContent");

      if (cachedContent) {
        setContent(JSON.parse(cachedContent));
        return;
      }

      setIsLoading(true);
      try {
        const data = await fetchWebflowData();
        setContent(data);
        cacheWebflowData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load content");
      } finally {
        setIsLoading(false);
      }
    };

    if (!content && !error) {
      loadContent();
    }
  }, [content, error, setContent, setError, setIsLoading]);

  return { content, error, isLoading };
};
