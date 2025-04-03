import { useEffect } from 'react';
import { BigTile } from '../../molecule/BigTile';
import { useMap } from './hooks/useMap';

export function Map() {
  const { bigTiles } = useMap();

  useEffect(() => {
    // TODO: LOGIC TO GENERATE NEW MAP WHEN THE EVENT START NEW GAME IS TRIGGERED
  }, []);

  return (
    <group>
      {bigTiles.map(bigTile => (
        <BigTile key={bigTile.id} data={bigTile} />
      ))}
    </group>
  );
}
