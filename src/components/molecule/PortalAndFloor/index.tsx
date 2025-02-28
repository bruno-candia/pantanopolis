import React from 'react';
import { GameBlock } from '../../atomic/GameBlock';
import { Portal } from '../../atomic/Portal';

interface TowerAndFloorProps extends React.ComponentProps<'group'> {}

export const PortalAndFloor: React.FC<TowerAndFloorProps> = (props) => {
  return (
    <group {...props}>
      <Portal scale={[0.7, 0.7, 0.7]} position={[0, 0.1, 0]}/>
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