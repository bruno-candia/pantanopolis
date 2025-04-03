import { useUnit } from 'effector-react';
import { useRef } from 'react';
import * as THREE from 'three';
import { Map } from '../../components/organism/Map';
import { $gameSetting } from '../../store/GameSetting/GameSettingStore';

export function Game() {
  const groupRef = useRef<THREE.Group>(null);
  const { gameStarted } = useUnit($gameSetting);

  return (
    <>
      {gameStarted && (
        <group ref={groupRef}>
          <Map />
        </group>
      )}
    </>
  );
}
