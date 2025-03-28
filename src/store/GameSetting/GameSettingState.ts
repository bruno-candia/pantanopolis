import { createRef, RefObject } from "react";
import * as THREE from "three";

interface GameSettingState {
  gameStarted: boolean;
  gameOver: boolean;
  level: number;
  gold: number;
  musicEnabled: boolean;
  camera: RefObject<THREE.Object3D | null>;
}

const GameSettingState: GameSettingState = {  
  gameStarted: false,
  gameOver: false,
  level: 0,
  gold: 0,
  musicEnabled: false,
  camera: createRef<THREE.Object3D>(),
}

export default GameSettingState;
