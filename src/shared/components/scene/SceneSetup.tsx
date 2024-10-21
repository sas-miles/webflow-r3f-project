import React from "react";
import CameraSetup from "~/features/experience/components/CameraSetup";
import EnvironmentSetup from "~/features/experience/components/EnvironmentSetup";
import { City } from "~/features/cityEnvironment/components/City";
import Effects from "~/features/experience/components/Effects";

const SceneSetup = () => {
  return (
    <>
      <CameraSetup />
      <EnvironmentSetup />
      <City />
      <Effects />
    </>
  );
};

export default SceneSetup;
