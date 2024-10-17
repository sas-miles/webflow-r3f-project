// ContentDisplay.tsx
import React from "react";
import { useContentStore } from "./useContentStore";

const ContentDisplay: React.FC = () => {
  const { contentData, activePOI } = useContentStore();

  if (!activePOI || !contentData[activePOI]) return null;

  return (
    <div className="content-display">
      <div dangerouslySetInnerHTML={{ __html: contentData[activePOI] }} />
    </div>
  );
};

export default ContentDisplay;
