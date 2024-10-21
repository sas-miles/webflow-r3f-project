// src/features/pointsOfInterest/components/SectionNarrative.tsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigationStore } from "~/features/zustandStore/navigationStore";

type SectionNarrativeProps = {
  sectionName: string;
  title: string;
  content: string;
};

const SectionNarrative: React.FC<SectionNarrativeProps> = ({
  sectionName,
  title,
  content,
}) => {
  const { setTargetScreen } = useNavigationStore();

  return (
    <motion.section
      className="section-narrative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="mt-4 text-lg">{content}</p>
      <button
        onClick={() => setTargetScreen("Main")}
        className="mt-6 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Back to Entrance
      </button>
    </motion.section>
  );
};

export default SectionNarrative;
