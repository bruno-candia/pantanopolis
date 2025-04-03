export type TileType =
  | 'grass'
  | 'path'
  | 'mountain'
  | 'castle'
  | 'portal'
  | 'empty';

export type PathDirection = 'north' | 'east' | 'south' | 'west' | 'none';

export interface Tile {
  id: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  startPath: {
    x: number;
    y: number;
    z: number;
  };
  endPath: {
    x: number;
    y: number;
    z: number;
  };
  type: TileType;
  isTower?: boolean;
  isPath?: boolean;
  isPortal?: boolean;
  isCastle?: boolean;
}

export interface BigTile {
  id: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  tiles: Tile[][];
  isEmpty: boolean;
  hasSpecial: boolean;
  specialType?: 'castle' | 'portal';
  pathEnter?: PathDirection;
  pathExit?: PathDirection;
}

export interface BigTileCell {
  x: number;
  z: number;
  isEmpty: boolean;
  hasSpecial: boolean;
  specialType?: 'castle' | 'portal';
  visited?: boolean;
  distance?: number;
  parent?: BigTileCell;
  pathEnter?: PathDirection;
  pathExit?: PathDirection;
}
