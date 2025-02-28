import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { JSX } from 'react/jsx-runtime';

export function Portal(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/Portal/model.glb');

  if (!nodes.Archway1) {
    console.warn('O nó Archway1 não foi encontrado no modelo GLTF');
    return null;
  }

  return (
    <group {...props} dispose={null} scale={Array.isArray(props.scale) ? [props.scale[0] * 0.001, props.scale[1] * 0.001, props.scale[2] * 0.001] : [1, 1, 1]}>
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