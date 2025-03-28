import * as THREE from 'three';
import { useRef } from 'react';
import { Tower } from '../../components/atomic/Tower';
import { $gameSetting } from '../../store/GameSetting/GameSettingStore';
import { useUnit } from 'effector-react';

export function Game()  {
  const groupRef = useRef<THREE.Group>(null);
  const { gameStarted } = useUnit($gameSetting);

  return (
    <>
      {gameStarted && (
        <group ref={groupRef}>
          <Tower/>
        </group> 
      )}
    </>
  );
};