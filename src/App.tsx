import React from "react";
import { useEffect, useState } from "react";

interface Item {
  _id: string;
  name: string;
  description?: string;
  [key: string]: any;
}

interface WebflowData {
  items: Array<{
    _id: string;
    name: string;
    [key: string]: any;
  }>;
  count: number;
  limit: number;
  offset: number;
  total: number;
}

function App() {
  const [contentData, setContentData] = useState<Item[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Fetching content...");
    fetch("https://webflow-r3f-project.vercel.app/api/getContent")
      .then((response) => response.json())
      .then((data: WebflowData) => setContentData(data.items))
      .catch((error) => {
        console.error("Error fetching content:", error);
        setError("Failed to load content.");
      });
  }, []);

  if (error) return <div>{error}</div>;
  if (!contentData) return <div>Loading...</div>;

  return (
    <div>
      {contentData.map((item) => (
        <div key={item._id}>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
