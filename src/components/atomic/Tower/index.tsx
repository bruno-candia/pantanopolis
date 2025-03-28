import { useGLTF } from '@react-three/drei'
import { MathProps, ReactProps, EventHandlers, InstanceProps } from '@react-three/fiber'
import { Mutable, Overwrite } from '@react-three/fiber/dist/declarations/src/core/utils'
import { useRef } from 'react'
import { JSX } from 'react/jsx-runtime'
import * as THREE from 'three';

export function Tower(props: JSX.IntrinsicAttributes & Mutable<Overwrite<Partial<Overwrite<THREE.Group<THREE.Object3DEventMap>, MathProps<THREE.Group<THREE.Object3DEventMap>> & ReactProps<THREE.Group<THREE.Object3DEventMap>> & Partial<EventHandlers>>>, Omit<InstanceProps<THREE.Group<THREE.Object3DEventMap>, typeof THREE.Group>, "object">>>) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF('/models/Tower/model.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh geometry={(nodes.Turret_Gun_Base_1 as THREE.Mesh).geometry} material={materials.Black} />
        <mesh geometry={(nodes.Turret_Gun_Base_2 as THREE.Mesh).geometry} material={materials.Orange} />
        <mesh geometry={(nodes.Turret_Gun_Base_3 as THREE.Mesh).geometry} material={materials.LightGrey} />
        <mesh geometry={(nodes.Turret_Gun_Base_4 as THREE.Mesh).geometry} material={materials.Grey} />
      </group>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh geometry={(nodes.Turret_Gun_Top_1 as THREE.Mesh).geometry} material={materials.Black} />
        <mesh geometry={(nodes.Turret_Gun_Top_2 as THREE.Mesh).geometry} material={materials.LightGrey} />
        <mesh geometry={(nodes.Turret_Gun_Top_3 as THREE.Mesh).geometry} material={materials.Grey} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/Tower/model.glb');
