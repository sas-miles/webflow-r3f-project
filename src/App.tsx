import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { Canvas } from "@react-three/fiber";
import { City } from "./components/city";
import { Html, OrbitControls, Stage } from "@react-three/drei";

interface WebflowData {
  fieldData: {
    "page-link": string;
    slug: string;
    name: string;
    title: string;
    "main-content": string;
    "featured-image": {
      url: string;
      alt: string | null;
    };
  };
}

function App() {
  const [contentData, setContentData] = useState<WebflowData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cachedContent = localStorage.getItem("webflowContent");

    if (cachedContent) {
      console.log("Loading cached content...");
      setContentData(JSON.parse(cachedContent));
    } else {
      console.log("Fetching content...");
      fetch("https://webflow-r3f-project.vercel.app/api/getContent")
        .then((response) => response.json())
        .then((data: WebflowData) => {
          setContentData(data);
          localStorage.setItem("webflowContent", JSON.stringify(data)); // Cache content in localStorage
        })
        .catch((error) => {
          console.error("Error fetching content:", error);
          setError("Failed to load content.");
        });
    }
  }, []);

  if (error) return <div>{error}</div>;
  if (!contentData) return <div>Loading...</div>;

  const { fieldData } = contentData;

  return (
    // <>
    //   <h1>{fieldData.title}</h1>
    //   <div
    //     dangerouslySetInnerHTML={{
    //       __html: DOMPurify.sanitize(fieldData["main-content"]),
    //     }}
    //   />
    //   <img
    //     src={fieldData["featured-image"].url}
    //     alt={fieldData["featured-image"].alt || "Featured"}
    //   />
    //   <a href={fieldData["page-link"]}>Read More</a>
    // </>
    <>
      <Canvas>
        <OrbitControls />

        <Stage>
          <Html>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-4xl font-bold text-red-500">
                {fieldData.title}
              </h1>
              <img
                src={fieldData["featured-image"].url}
                alt={fieldData["featured-image"].alt || "Featured"}
              />
            </div>
          </Html>
          <City />
        </Stage>
      </Canvas>
    </>
  );
}

export default App;
