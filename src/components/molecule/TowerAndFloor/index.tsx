import React from 'react';
import { Tower } from '../../atomic/Tower';
import { GameBlock } from '../../atomic/GameBlock';

interface TowerAndFloorProps extends React.ComponentProps<'group'> {}

export const TowerAndFloor: React.FC<TowerAndFloorProps> = (props) => {
  return (
    <group {...props}>
      <Tower scale={[0.57, 0.57, 0.57]} position={[0, 0.1, 0]} />
      <GameBlock 
        type='road'
      />
      <GameBlock 
        type='grass'
        position={[1, 0, 0]}
      />
        <GameBlock 
        type='grass'
        position={[-1, 0, 0]}
      />
        <GameBlock 
        type='grass'
        position={[0, 0, -1]}
      />
        <GameBlock 
        type='grass'
        position={[1, 0, -1]}
      />
        <GameBlock 
        type='grass'
        position={[-1, 0, -1]}
      />
    </group>
  );
};