import { WebflowData } from "../types/webflow";

export const fetchWebflowData = async (): Promise<WebflowData> => {
  const response = await fetch(
    "https://webflow-r3f-project.vercel.app/api/getContent",
  );
  if (!response.ok) {
    throw new Error("Failed to fetch Webflow content");
  }
  return response.json();
};

export const cacheWebflowData = (data: WebflowData) => {
  localStorage.setItem("webflowContent", JSON.stringify(data));
};
