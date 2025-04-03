import { useGLTF } from '@react-three/drei';
import {
  EventHandlers,
  InstanceProps,
  MathProps,
  ReactProps,
} from '@react-three/fiber';
import {
  Mutable,
  Overwrite,
} from '@react-three/fiber/dist/declarations/src/core/utils';
import { useRef } from 'react';
import { JSX } from 'react/jsx-runtime';
import * as THREE from 'three';

export function Castle(
  props: JSX.IntrinsicAttributes &
    Mutable<
      Overwrite<
        Partial<
          Overwrite<
            THREE.Group<THREE.Object3DEventMap>,
            MathProps<THREE.Group<THREE.Object3DEventMap>> &
              ReactProps<THREE.Group<THREE.Object3DEventMap>> &
              Partial<EventHandlers>
          >
        >,
        Omit<
          InstanceProps<
            THREE.Group<THREE.Object3DEventMap>,
            typeof THREE.Group
          >,
          'object'
        >
      >
    >
) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF('/models/Castle/model.glb');

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          geometry={(nodes.Bell_Tower_1 as THREE.Mesh).geometry}
          material={materials.Stone_Light}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={(nodes.Bell_Tower_2 as THREE.Mesh).geometry}
          material={materials.Stone_Dark}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={(nodes.Bell_Tower_3 as THREE.Mesh).geometry}
          material={materials.Wood}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={(nodes.Bell_Tower_4 as THREE.Mesh).geometry}
          material={materials.Wood_Side}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={(nodes.Bell_Tower_5 as THREE.Mesh).geometry}
          material={materials.Bell}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={(nodes.Bell_Tower_6 as THREE.Mesh).geometry}
          material={materials.Stone}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={(nodes.Bell_Tower_7 as THREE.Mesh).geometry}
          material={materials.Wood_Light}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={(nodes.Bell_Tower_8 as THREE.Mesh).geometry}
          material={materials.Windows}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={(nodes.Bell_Tower_9 as THREE.Mesh).geometry}
          material={materials.RoofTiles}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={(nodes.Bell_Tower_10 as THREE.Mesh).geometry}
          material={materials.Beige}
          castShadow
          receiveShadow
        />
      </group>
    </group>
  );
}

useGLTF.preload('/models/Castle/model.glb');
