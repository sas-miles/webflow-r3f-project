import React, { useRef } from "react";

import { EffectComposer, Autofocus } from "@react-three/postprocessing";
import { editable as e } from "@theatre/r3f";
import type * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";

function Effects() {
  const focusTargetRef = useRef<[number, number, number]>([-4, 4, -10]);
  const focusTargetVisualizerRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (focusTargetVisualizerRef.current) {
      const position = focusTargetVisualizerRef.current.position;
      focusTargetRef.current = [position.x, position.y, position.z];
    }
  });

  return (
    <>
      <e.mesh
        theatreKey="Focus Target"
        ref={focusTargetVisualizerRef}
        visible="editor"
      >
        <Sphere />
        <meshNormalMaterial />
      </e.mesh>
      <EffectComposer>
        <Autofocus
          target={[
            focusTargetRef.current[0],
            focusTargetRef.current[1],
            focusTargetRef.current[2],
          ]}
          smoothTime={0.3}
          debug={1}
          focusRange={0.02}
          bokehScale={10}
        />
      </EffectComposer>
    </>
  );
}

export default Effects;
