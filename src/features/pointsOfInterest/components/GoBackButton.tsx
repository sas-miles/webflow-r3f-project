import { Html } from "@react-three/drei";
import React from "react";
import { useNavigationStore } from "~/features/zustandStore/navigationStore";

const GoBackButton: React.FC = () => {
  const { setTargetScreen } = useNavigationStore();

  return (
    <>
      <Html>
        <button
          onClick={() => setTargetScreen("Intro")}
          className="rounded-full bg-gray-400 bg-opacity-50 p-3 font-medium text-white"
        >
          Back to Entrance
        </button>
      </Html>
    </>
  );
};

export default GoBackButton;
