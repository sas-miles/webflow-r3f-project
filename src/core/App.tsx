// src/core/App.tsx
import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import SceneSetup from "~/shared/components/scene/SceneSetup";
import AnimationControls from "~/features/experience/components/AnimationControls";
import { SheetProvider } from "@theatre/r3f";
import { initializeTheatre } from "~/shared/lib/theatre/initializeTheatre";
import UI from "~/features/pointsOfInterest/components/UI";
import Content from "~/features/pointsOfInterest/components/Content";

const project = initializeTheatre();
const mainSheet = project.sheet("Main");

function App() {
  useEffect(() => {
    initializeTheatre();
  }, []);
  return (
    <>
      <UI />
      <Canvas>
        <SheetProvider sheet={mainSheet}>
          <SceneSetup />
          <AnimationControls />

          {/* <Content /> */}
        </SheetProvider>
      </Canvas>
    </>
  );
}

export default App;
