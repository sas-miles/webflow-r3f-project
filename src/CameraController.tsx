// CameraController.tsx
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useContentStore } from "./useContentStore";

const CameraController: React.FC = () => {
  const cameraControls = useThree((state) => state.controls);
  const activePOI = useContentStore((state) => state.activePOI);
  const poiPositions = poiData.reduce(
    (acc, poi) => ({ ...acc, [poi.id]: poi.position }),
    {},
  );

  useEffect(() => {
    if (activePOI && cameraControls) {
      const targetPosition = poiPositions[activePOI];
      cameraControls.setLookAt(
        cameraControls.camera.position.x,
        cameraControls.camera.position.y,
        cameraControls.camera.position.z,
        targetPosition[0],
        targetPosition[1],
        targetPosition[2],
        true, // Smooth transition
      );
    }
  }, [activePOI, cameraControls]);

  return null;
};
export default CameraController;
