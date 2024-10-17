// ContentLoader.tsx
import React, { useEffect, useState } from "react";

interface ContentData {
  [key: string]: string;
}

interface LinkData {
  [key: string]: {
    href: string;
    text: string;
  };
}

const ContentLoader: React.FC = () => {
  const [contentData, setContentData] = useState<ContentData>({});
  const [linkData, setLinkData] = useState<LinkData>({});

  useEffect(() => {
    // Extract text content
    const contentElements =
      document.querySelectorAll<HTMLElement>("[data-content-key]");
    const newContentData: ContentData = {};

    contentElements.forEach((el) => {
      const key = el.getAttribute("data-content-key")!;
      const content = el.textContent?.trim() || "";
      newContentData[key] = content;
    });

    setContentData(newContentData);

    // Extract link content
    const linkElements =
      document.querySelectorAll<HTMLAnchorElement>("[data-link-key]");
    const newLinkData: LinkData = {};

    linkElements.forEach((el) => {
      const key = el.getAttribute("data-link-key")!;
      const href = el.getAttribute("href") || "";
      const text = el.textContent?.trim() || "";
      newLinkData[key] = { href, text };
    });

    setLinkData(newLinkData);
  }, []);

  // Use contentData and linkData in your component
  return (
    <div>
      <h1>{contentData["header-text"]}</h1>
      <a href={linkData["main-link"]?.href}>{linkData["main-link"]?.text}</a>
    </div>
  );
};

export default ContentLoader;
