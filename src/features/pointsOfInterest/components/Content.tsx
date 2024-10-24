import { Html } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import { cacheWebflowData, fetchWebflowData } from "~/shared/api/webflowAPI";
import { WebflowData } from "~/shared/types/webflow";

export default function Content() {
  const [contentData, setContentData] = useState<WebflowData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cachedContent = localStorage.getItem("webflowContent");

    if (cachedContent) {
      console.log("Loading cached content...");
      setContentData(JSON.parse(cachedContent));
    } else {
      console.log("Fetching content...");
      fetchWebflowData()
        .then((data) => {
          setContentData(data);
          cacheWebflowData(data); // Cache content in localStorage
        })
        .catch((error) => {
          console.error("Error fetching content:", error);
          setError("Failed to load content.");
        });
    }
  }, []);

  if (error) {
    return (
      <Html>
        <div>{error}</div>
      </Html>
    );
  }

  if (!contentData) {
    return (
      <Html>
        <div>Loading...</div>
      </Html>
    );
  }

  return (
    <>
      <Html>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-red-500">
            {contentData.fieldData.title}
          </h1>
          <img
            src={contentData.fieldData["featured-image"].url}
            alt={contentData.fieldData["featured-image"].alt || "Featured"}
          />
        </div>
      </Html>
    </>
  );
}
