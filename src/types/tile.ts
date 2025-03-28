export interface Tile {
  position: {
    x: number,
    y: number,
    z: number
  };
  color: string;
  isStartTile?: boolean;
  isEndTile?: boolean;
}
