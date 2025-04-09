import { RefObject, createRef } from 'react';
import * as THREE from 'three';

interface GameSettingState {
  musicEnabled: boolean;
  camera: RefObject<THREE.Object3D | null>;
}

const GameSettingState: GameSettingState = {
  musicEnabled: false,
  camera: createRef<THREE.Object3D>(),
};

export default GameSettingState;
