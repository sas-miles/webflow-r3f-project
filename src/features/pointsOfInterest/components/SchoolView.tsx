import React from "react";
import { motion } from "framer-motion";
import { useNavigationStore } from "~/features/zustandStore/navigationStore";

function SchoolView() {
  const { isAnimating, currentScreen, setTargetScreen } = useNavigationStore();

  return (
    <motion.section
      animate={isAnimating ? "" : currentScreen}
      className={`absolute inset-0 flex flex-col items-start justify-center p-10 transition-opacity duration-1000 ${
        currentScreen === "School" && !isAnimating
          ? ""
          : "pointer-events-none opacity-0"
      }`}
    >
      <div className="md:max-w-2xl">
        <motion.h1
          className="-ml-1 text-7xl font-extrabold opacity-90"
          initial={{
            y: 80,
            opacity: 0,
          }}
          variants={{
            School: {
              y: 0,
              opacity: 1,
              transition: {
                delay: 0.2,
                duration: 1.2,
              },
            },
          }}
        >
          My School
        </motion.h1>
        <motion.p
          className="mt-2"
          initial={{
            y: 80,
            opacity: 0,
          }}
          variants={{
            School: {
              y: 0,
              opacity: 1,
              transition: {
                delay: 0.6,
                duration: 1.2,
              },
            },
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae
          voluptatum, quia, quibusdam, voluptates voluptate quos quod
          voluptatibus quas doloribus quidem. Quisquam quae voluptatum, quia,
          quibusdam, voluptates voluptate quos quod voluptatibus quas doloribus
          quidem.
        </motion.p>
        <motion.button
          onClick={() => setTargetScreen("Main")}
          className="mt-3 rounded-full bg-gray-400 bg-opacity-50 p-3 font-medium"
          initial={{
            y: 80,
            opacity: 0,
          }}
          variants={{
            School: {
              y: 0,
              opacity: 1,
              transition: {
                delay: 1,
                duration: 1.2,
              },
            },
          }}
        >
          Back to the entrance
        </motion.button>
      </div>
    </motion.section>
  );
}

export default SchoolView;
