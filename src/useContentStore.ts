// useContentStore.ts
import { create } from "zustand";

interface ContentData {
  [key: string]: string;
}

interface ContentState {
  contentData: ContentData;
  activePOI: string | null;
  fetchContent: () => void;
  setActivePOI: (poiId: string | null) => void;
}

export const useContentStore = create<ContentState>((set) => ({
  contentData: {},
  activePOI: null,
  fetchContent: () => {
    const contentElements =
      document.querySelectorAll<HTMLElement>("[data-content-key]");
    const newContentData: ContentData = {};

    contentElements.forEach((el) => {
      const key = el.getAttribute("data-content-key")!;
      const content = el.innerHTML.trim();
      newContentData[key] = content;
    });

    set({ contentData: newContentData });
  },
  setActivePOI: (poiId) => set({ activePOI: poiId }),
}));
