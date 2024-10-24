import { create } from "zustand";
import { WebflowData } from "~/shared/types/webflow";

interface WebflowStore {
  contentMap: Map<string, WebflowData>;
  error: string | null;
  isLoading: boolean;
  setContent: (itemId: string, content: WebflowData) => void;
  setError: (error: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useWebflowStore = create<WebflowStore>((set) => ({
  contentMap: new Map(),
  error: null,
  isLoading: false,
  setContent: (itemId, content) =>
    set((state) => ({
      contentMap: new Map(state.contentMap).set(itemId, content),
    })),
  setError: (error) => set({ error }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
