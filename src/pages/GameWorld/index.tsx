import { useUnit } from 'effector-react';
import { useRef } from 'react';
import * as THREE from 'three';
import { Tower } from '../../components/atomic/Tower';
import { $gameState } from '../../store/GameState/GameStateStore';

export function GameWorld() {
  const groupRef = useRef<THREE.Group>(null);
  const { gameStarted } = useUnit($gameState);

  return (
    <>
      {gameStarted && (
        <group ref={groupRef}>
          <Tower />
        </group>
      )}
    </>
  );
}
