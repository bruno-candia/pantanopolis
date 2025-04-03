import { useGLTF } from '@react-three/drei';
import { JSX } from 'react/jsx-runtime';
import * as THREE from 'three';

export function Portal(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/Portal/model.glb');

  if (!nodes.Archway1) {
    console.warn('O nó Archway1 não foi encontrado no modelo GLTF');
    return null;
  }

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={(nodes.Archway1 as THREE.Mesh).geometry}
        material={materials.lambert3SG}
        castShadow
        receiveShadow
      />
    </group>
  );
}

useGLTF.preload('/models/Portal/model.glb');
