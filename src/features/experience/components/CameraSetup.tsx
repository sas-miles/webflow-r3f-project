// src/features/experience/components/CameraSetup.tsx
import { PerspectiveCamera } from "@theatre/r3f";
import { useRef } from "react";
import { editable as e } from "@theatre/r3f";
import { Sphere } from "@react-three/drei";

const CameraSetup = () => {
  const cameraTargetRef = useRef();

  return (
    <>
      <PerspectiveCamera
        position={[5, 5, 10]}
        fov={30}
        near={1}
        makeDefault
        theatreKey="Camera"
        lookAt={cameraTargetRef}
      />
      <e.mesh theatreKey="Camera Target" visible="editor" ref={cameraTargetRef}>
        <Sphere />
        <meshNormalMaterial />
      </e.mesh>
    </>
  );
};

export default CameraSetup;
