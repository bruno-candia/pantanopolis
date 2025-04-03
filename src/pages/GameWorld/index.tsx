import { OrbitControls, Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from 'three';
import { SuspenseSound } from '../../components/atomic/Sound';
import { Game } from '../Game';
import { MenuScreen } from '../MenuScreen';
import './styles.css';

export function GameWorld() {
  return (
    <div className="game-world">
      <Canvas
        shadows={{ type: THREE.PCFSoftShadowMap }}
        camera={{ position: [-10, 15, 10], fov: 35 }}
      >
        <Suspense fallback={null}>
          <OrbitControls
            minPolarAngle={THREE.MathUtils.degToRad(20)}
            maxPolarAngle={THREE.MathUtils.degToRad(180)}
            enablePan={true}
            panSpeed={1}
            target={[0, 0, 0]}
            enabled={true}
          />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.5}
            castShadow
            color={'#ffffff'}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={0.5}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <Game />
          <SuspenseSound />
          <Preload all />
        </Suspense>
      </Canvas>
      <MenuScreen />
    </div>
  );
}
