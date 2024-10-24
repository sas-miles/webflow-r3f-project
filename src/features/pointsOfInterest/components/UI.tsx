// src/features/pointsOfInterest/components/UI.tsx
import React from "react";
import { useNavigationStore } from "~/features/zustandStore/navigationStore";

import MainView from "./MainView";
import { motion } from "framer-motion";
import SchoolView from "./SchoolView";

export const UI: React.FC = () => {
  const { currentScreen, isAnimating } = useNavigationStore();

  return (
    <motion.main
      className="fixed inset-0 z-10 h-[100dvh] w-[100dvw]"
      animate={isAnimating ? "" : currentScreen}
    >
      <MainView />
      <SchoolView />
    </motion.main>
  );
};

export default UI;
