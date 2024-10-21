// src/features/experience/components/EnvironmentSetup.tsx
import { Environment } from "@react-three/drei";
import React from "react";

const EnvironmentSetup = () => {
  return (
    <>
      {/* <directionalLight
        position={[10, 3, 3]}
        intensity={0.2}
        castShadow
        shadow-bias={-0.001}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      /> */}
      <Environment preset="city" />
    </>
  );
};

export default EnvironmentSetup;
