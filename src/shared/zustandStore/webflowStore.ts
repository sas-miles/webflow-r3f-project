import { create } from "zustand";
import { WebflowData } from "../types/webflow";

interface WebflowStore {
  content: WebflowData | null;
  error: string | null;
  isLoading: boolean;
  setContent: (content: WebflowData) => void;
  setError: (error: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useWebflowStore = create<WebflowStore>((set) => ({
  content: null,
  error: null,
  isLoading: false,
  setContent: (content) => set({ content }),
  setError: (error) => set({ error }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
