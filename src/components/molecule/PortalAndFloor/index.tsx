import React from 'react';
import { GameBlock } from '../../atomic/GameBlock';
import { Portal } from '../../atomic/Portal';

type TowerAndFloorProps = React.ComponentProps<'group'>

export const PortalAndFloor: React.FC<TowerAndFloorProps> = (props) => {
  return (
    <group {...props}>
      <Portal scale={[0.7, 0.7, 0.7]} position={[0, 0.1, 0]}/>
      <GameBlock 
        type='road'
        position={[0, 0, 0]}
        upperHeight={0.001}
      />
    </group>
  );
};