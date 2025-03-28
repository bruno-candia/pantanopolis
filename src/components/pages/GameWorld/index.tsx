import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { MenuScreen } from "../MenuScreen";
import { SuspenseSound } from "../../atomic/Sound";
import { Preload } from "@react-three/drei";
import { Game } from "../Game";
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

export function GameWorld() {
  return (
    <>
      <Canvas shadows camera={{ position: [-10, 15, 10], fov: 35 }}>
        <Suspense fallback={null}>
          <OrbitControls
            minPolarAngle={THREE.MathUtils.degToRad(20)}
            maxPolarAngle={THREE.MathUtils.degToRad(180)}
            enablePan={true}
            panSpeed={1}
            target={[0, 0, 0]}
            enabled={true}
          />
          <ambientLight intensity={1} />
          <directionalLight
            position={[9, 5, 5]}
            intensity={2}
            castShadow
            color={"#ffffff"}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={0.5}
            shadow-camera-far={50}
          />
          <Game />
          <SuspenseSound />
          <Preload all />
        </Suspense>
      </Canvas>
      <MenuScreen />
    </>
  );
}
