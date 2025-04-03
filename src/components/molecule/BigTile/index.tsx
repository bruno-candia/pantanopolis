import { TILE } from '../../../constants';
import { BigTile as IBigTile } from '../../../types/mapType';
import { SmallTile } from '../../atomic/SmallTile';

interface BigTileProps {
  data: IBigTile;
}

export function BigTile({ data }: BigTileProps) {
  const { position, tiles, pathEnter, pathExit } = data;

  return (
    <group position={[position.x / 2.25, position.y, position.z / 2.25]}>
      {tiles.map(row =>
        row.map(tile => (
          <group
            key={tile.id}
            position={[
              tile.position.x * TILE.GRID_OFFSET,
              tile.position.y,
              tile.position.z * TILE.GRID_OFFSET,
            ]}
          >
            <SmallTile
              type={tile.type}
              pathEnter={pathEnter}
              pathExit={pathExit}
            />
          </group>
        ))
      )}
    </group>
  );
}
