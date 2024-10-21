import React from "react";
import { motion } from "framer-motion";
import { useNavigationStore } from "~/features/zustandStore/navigationStore";

function MainView() {
  const { isAnimating, currentScreen, setTargetScreen } = useNavigationStore();

  return (
    <section
      className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${
        currentScreen === "Main" && !isAnimating
          ? ""
          : "pointer-events-none opacity-0"
      }`}
    >
      <motion.img
        src="/logo.svg"
        alt="Medieval Town"
        className="w-32"
        initial={{
          y: -80,
          opacity: 0,
        }}
        variants={{
          Home: {
            y: 0,
            opacity: 0.9,
            transition: {
              delay: 1,
              duration: 1.2,
            },
          },
        }}
      />
      <h1 className="text-7xl font-extrabold opacity-90">Medieval Town</h1>
      <motion.div
        className="mt-2 flex items-center gap-3"
        initial={{
          y: 80,
          opacity: 0,
        }}
        variants={{
          Main: {
            y: 0,
            opacity: 1,
            transition: {
              delay: 0.2,
              duration: 1.2,
            },
          },
        }}
      >
        <button
          onClick={() => setTargetScreen("Apartment")}
          className="rounded-full bg-gray-400 bg-opacity-50 p-3 font-medium"
        >
          Visit Apartment
        </button>
        <button
          onClick={() => setTargetScreen("School")}
          className="rounded-full bg-gray-400 bg-opacity-50 p-3 font-medium text-white"
        >
          Visit School
        </button>
      </motion.div>
    </section>
  );
}

export default MainView;
