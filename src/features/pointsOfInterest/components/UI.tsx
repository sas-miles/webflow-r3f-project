// src/features/pointsOfInterest/components/UI.tsx
import React from "react";
import { useNavigationStore } from "~/features/zustandStore/navigationStore";

import MainView from "./MainView";
import { motion } from "framer-motion";
import SchoolView from "./SchoolView";
import { POINTS_OF_INTEREST } from "../lib/poiConfig";

export const UI: React.FC = () => {
  const { currentScreen, isAnimating } = useNavigationStore();

  return (
    <motion.main
      className="fixed inset-0 z-10 h-[100dvh] w-[100dvw]"
      animate={isAnimating ? "" : currentScreen}
    >
      <MainView />
      <SchoolView poi={POINTS_OF_INTEREST[0]} />
    </motion.main>
  );
};

export default UI;
