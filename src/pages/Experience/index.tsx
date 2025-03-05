import React, { useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { Tower } from '../../components/atomic/Tower';


export const Experience: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <>
      <OrbitControls 
        minPolarAngle={THREE.MathUtils.degToRad(20)} 
        maxPolarAngle={THREE.MathUtils.degToRad(180)}
        enablePan={true}
        panSpeed={1}
        target={[0, 0, 0]}
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

      <group ref={groupRef}>
        <Tower position={[0, 0, 0]} />
      </group> 
    </>
  );
};