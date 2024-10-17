import React from "react";
import { poiData } from "../poiData";
import ClickableMesh from "./ClickableMesh";

const Scene: React.FC = () => {
  return (
    <>
      {poiData.map((poi) => (
        <ClickableMesh key={poi.id} id={poi.id} position={poi.position} />
      ))}
    </>
  );
};

export default Scene;
