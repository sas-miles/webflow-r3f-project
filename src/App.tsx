// App.tsx
import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { useContentStore } from "./useContentStore";
import Scene from "./components/Scene";
import CameraController from "./CameraController";
import ContentDisplay from "./ContentDisplay";

function App() {
  const fetchContent = useContentStore((state) => state.fetchContent);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return (
    <>
      <Canvas camera={{ position: [0, 0, 10] }}>
        <CameraControls />
        <CameraController />
        <ambientLight />
        <Scene />
      </Canvas>
      <ContentDisplay />
    </>
  );
}

export default App;
