import React from 'react';
import { GameBlock } from '../../atomic/GameBlock';

type Variant = 'L' | 'T' | 'X' | 'I';

interface RoadIntersectionProps extends React.ComponentProps<'group'> {
  variant?: Variant;
  rotation?: 0 | 90 | 180 | 270;
}

type Block = { pos: [number, number, number], type: 'road' | 'grass' };

export const RoadIntersection: React.FC<RoadIntersectionProps> = ({
  variant = 'L',
  rotation = 0,
  ...groupProps
}) => {
  let blocks: Block[] = [];
  
  switch(variant) {
    case 'I':
      blocks = [
        { pos: [-1, 0, 0], type: 'road' },
        { pos: [0, 0, 0], type: 'road' },
        { pos: [1, 0, 0], type: 'road' },
        { pos: [-1, 0, -1], type: 'grass' },
        { pos: [0, 0, -1], type: 'grass' },
        { pos: [1, 0, -1], type: 'grass' },
        { pos: [-1, 0, 1], type: 'grass' },
        { pos: [0, 0, 1], type: 'grass' },
        { pos: [1, 0, 1], type: 'grass' },
      ];
      break;

    
    case 'L':
      blocks = [
        { pos: [-1, 0, 0], type: 'road' },
        { pos: [0, 0, 0], type: 'road' },
        { pos: [0, 0, 1], type: 'road' },
        { pos: [-1, 0, -1], type: 'grass' },
        { pos: [0, 0, -1], type: 'grass' },
        { pos: [1, 0, -1], type: 'grass' },
        { pos: [1, 0, 0], type: 'grass' },
        { pos: [1, 0, 1], type: 'grass' },
        { pos: [-1, 0, 1], type: 'grass' },
      ];
      break;
    case 'T':
      // Layout para interseção em T (3 saídas)
      blocks = [
        { pos: [-1, 0, 0], type: 'road' },
        { pos: [0, 0, 0], type: 'road' },
        { pos: [1, 0, 0], type: 'road' },
        { pos: [0, 0, 1], type: 'road' },
        { pos: [-1, 0, 1], type: 'grass' },
        { pos: [1, 0, 1], type: 'grass' },
        { pos: [-1, 0, -1], type: 'grass' },
        { pos: [0, 0, -1], type: 'grass' },
        { pos: [1, 0, -1], type: 'grass' },
      ];
      break;
    case 'X':
      // Layout para interseção em X (4 saídas)
      blocks = [
        { pos: [-1, 0, 0], type: 'road' },
        { pos: [0, 0, 0], type: 'road' },
        { pos: [1, 0, 0], type: 'road' },
        { pos: [0, 0, 1], type: 'road' },
        { pos: [0, 0, -1], type: 'road' },
        { pos: [-1, 0, 1], type: 'grass' },
        { pos: [1, 0, 1], type: 'grass' },
        { pos: [-1, 0, -1], type: 'grass' },
        { pos: [1, 0, -1], type: 'grass' },
      ];
      break;
    default:
      break;
  }

  return (
    <group rotation-y={rotation * Math.PI / 180} {...groupProps}>
      {blocks.map((block, index) => (
        <GameBlock key={index} type={block.type} position={block.pos} />
      ))}
    </group>
  );
};