import React from 'react';
import { GameBlock } from '../../atomic/GameBlock';

interface PathStraightProps extends React.ComponentProps<'group'> {
  blockWidth?: number;
  blockDepth?: number;
  normalHeight?: number;
}

export const PathStraight: React.FC<PathStraightProps> = ({
  blockWidth = 1,
  blockDepth = 1,
  normalHeight = 0.1,
  ...groupProps
}) => {
  return (
    <group {...groupProps}>
      <GameBlock
        width={blockWidth}
        depth={blockDepth}
        position={[-1, 0, 0]}
      />
      <GameBlock 
        width={blockWidth}
        depth={blockDepth}
        type='road'
      />
      <GameBlock
        width={blockWidth}
        depth={blockDepth}
        position={[1, 0, 0]}
      />
    </group>
  );
};