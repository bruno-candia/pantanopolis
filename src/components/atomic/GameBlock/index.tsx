// File: src/components/blocks/GameBlock.tsx
import React from "react";

export interface GameBlockProps extends React.ComponentProps<"group"> {
  width?: number;
  depth?: number;
  type?: "grass" | "road" | "mountain";
  upperHeight?: number;
  position?: [number, number, number];
}

export const GameBlock: React.FC<GameBlockProps> = ({
  width = 1,
  depth = 1,
  type = "grass",
  upperHeight = 0.1,
  ...groupProps
}) => {
  const variant = {
    grass: {
      lowerColor: "#B9D8B6",
      upperColor: "#FEE6AC",
      lowerHeight: 0.1,
    },
    road: {
      lowerColor: "#FEE6AC",
      upperColor: "#FEE6AC",
      lowerHeight: 0.1,
    },
    mountain: {
      lowerColor: "#8B8B8B",
      upperColor: "#A9A9A9",
      lowerHeight: 0.1,
    },
  };

  return (
    <group {...groupProps}>
      <mesh
        position={[0, variant[type].lowerHeight / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[width, variant[type].lowerHeight, depth]} />
        <meshStandardMaterial color={variant[type].upperColor} />
      </mesh>
      <mesh
        position={[0, variant[type].lowerHeight + upperHeight / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[width, upperHeight, depth]} />
        <meshStandardMaterial color={variant[type].lowerColor} />
      </mesh>
    </group>
  );
};