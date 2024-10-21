// src/features/zustandStore/navigationStore.ts
import { create } from "zustand";

type ScreenName = "Intro" | "Main" | "School" | "Apartment" | "Office";

type NavigationState = {
  currentScreen: ScreenName;
  targetScreen: ScreenName;
  setCurrentScreen: (screen: ScreenName) => void;
  setTargetScreen: (screen: ScreenName) => void;
  isAnimating: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
  isSetup: boolean;
  setIsSetup: (isSetup: boolean) => void;
};

export const useNavigationStore = create<NavigationState>((set) => ({
  currentScreen: "Intro",
  targetScreen: "Main",
  setCurrentScreen: (screen) => set({ currentScreen: screen }),
  setTargetScreen: (screen) => set({ targetScreen: screen }),
  isAnimating: false,
  setIsAnimating: (isAnimating) => set({ isAnimating }),
  isSetup: false,
  setIsSetup: (isSetup) => set({ isSetup }),
}));
