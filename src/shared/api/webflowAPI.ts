import { WebflowData } from "../types/webflow";

export const fetchWebflowData = async (
  collectionId: string,
  itemId: string,
): Promise<WebflowData> => {
  const response = await fetch(
    `https://webflow-r3f-project.vercel.app/api/getContent?collectionId=${collectionId}&itemId=${itemId}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch content for POI: ${itemId}`);
  }

  return response.json();
};
