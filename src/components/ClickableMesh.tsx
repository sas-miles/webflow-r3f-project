import React from "react";
import { useContentStore } from "../useContentStore";

interface ClickableMeshProps {
  id: string;
  position: [number, number, number];
}

const ClickableMesh: React.FC<ClickableMeshProps> = ({ id, position }) => {
  const setActivePOI = useContentStore((state) => state.setActivePOI);

  const handleClick = () => {
    setActivePOI(id);
  };

  return (
    <mesh position={position} onClick={handleClick}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

export default ClickableMesh;
