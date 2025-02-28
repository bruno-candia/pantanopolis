// src/components/GrassBlock.tsx
import React from 'react';

export interface GrassBlockProps extends React.ComponentProps<'group'> {
  width?: number;
  depth?: number;
  type?: "grass" | "road";
  lowerHeight?: number;
  upperHeight?: number;
  lowerColor?: string;
  upperColor?: string;
  position?: [number, number, number];
}

export const GameBlock: React.FC<GrassBlockProps> = ({
  width = 1,
  depth = 1,
  type = "grass",
  lowerHeight = 0.1,
  upperHeight = 0.1,
  ...groupProps
}) => {
  const variant = {
    grass: {
      lowerColor: "#329532",
      upperColor: "#bdb18f",
      lowerHeight: 0.1,
    },
    road: {
      lowerColor: "#bdb18f",
      upperColor: "#bdb18f",
      lowerHeight: 0,
    },
  }
  return (
    <group  {...groupProps}>
      <mesh position={[0, variant[type].lowerHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, variant[type].lowerHeight, depth]} />
        <meshStandardMaterial color={variant[type].upperColor} />
      </mesh>
      <mesh position={[0, variant[type].lowerHeight + upperHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, upperHeight, depth]} />
        <meshStandardMaterial color={variant[type].lowerColor} />
      </mesh>
    </group>
  );
};