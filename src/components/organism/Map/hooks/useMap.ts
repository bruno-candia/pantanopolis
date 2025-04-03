import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { MapGenerator } from '../../../../services/MapGenerator';
import { setBigTiles } from '../../../../store/Map/MapEvent';
import { $map } from '../../../../store/Map/MapStore';

export function useMap() {
  const { bigTiles } = useUnit($map);

  useEffect(() => {
    if (bigTiles.length > 0) {
      setBigTiles(bigTiles);
    } else {
      generateNewMap();
    }
  }, [bigTiles]);

  const generateNewMap = () => {
    const mapGenerator = new MapGenerator('MEDIUM', 'EASY');

    const newBigTiles = mapGenerator.generateMap();

    setBigTiles(newBigTiles);
  };

  return {
    bigTiles,
    generateNewMap,
  };
}
