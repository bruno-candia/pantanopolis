import { useGLTF } from '@react-three/drei'
import { MathProps, ReactProps, EventHandlers, InstanceProps } from '@react-three/fiber'
import { Mutable, Overwrite } from '@react-three/fiber/dist/declarations/src/core/utils'
import { JSX } from 'react/jsx-runtime'
import * as THREE from 'three'


export function Tower(props: JSX.IntrinsicAttributes & Mutable<Overwrite<Partial<Overwrite<THREE.Group<THREE.Object3DEventMap>, MathProps<THREE.Group<THREE.Object3DEventMap>> & ReactProps<THREE.Group<THREE.Object3DEventMap>> & Partial<EventHandlers>>>, Omit<InstanceProps<THREE.Group<THREE.Object3DEventMap>, typeof THREE.Group>, "object">>>) {
  const { nodes, materials } = useGLTF('/models/Tower/model.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh geometry={(nodes.Bell_Tower_1 as THREE.Mesh).geometry} material={materials.Stone_Light} />
        <mesh geometry={(nodes.Bell_Tower_2 as THREE.Mesh).geometry} material={materials.Stone_Dark} />
        <mesh geometry={(nodes.Bell_Tower_3 as THREE.Mesh).geometry} material={materials.Wood} />
        <mesh geometry={(nodes.Bell_Tower_4 as THREE.Mesh).geometry} material={materials.Wood_Side} />
        <mesh geometry={(nodes.Bell_Tower_5 as THREE.Mesh).geometry} material={materials.Bell} />
        <mesh geometry={(nodes.Bell_Tower_6 as THREE.Mesh).geometry} material={materials.Stone} />
        <mesh geometry={(nodes.Bell_Tower_7 as THREE.Mesh).geometry} material={materials.Wood_Light} />
        <mesh geometry={(nodes.Bell_Tower_8 as THREE.Mesh).geometry} material={materials.Windows} />
        <mesh geometry={(nodes.Bell_Tower_9 as THREE.Mesh).geometry} material={materials.RoofTiles} />
        <mesh geometry={(nodes.Bell_Tower_10 as THREE.Mesh).geometry} material={materials.Beige} />
      </group>
    </group>
  )
}

useGLTF.preload('./models/Tower/model.glb')
