import { BIG_TILE, MAP, TERRAIN } from '../constants';
import { BigTile, BigTileCell, Tile, TileType } from '../types/mapType';

export class MapGenerator {
  private mapWidth: number;
  private mapHeight: number;
  private difficulty: 'EASY' | 'MEDIUM' | 'HARD';

  private bigTileGrid: BigTileCell[][] = [];

  private castle: BigTileCell | null = null;
  private portals: BigTileCell[] = [];
  private paths: BigTileCell[][] = [];

  constructor(
    size: 'SMALL' | 'MEDIUM' | 'LARGE' = 'SMALL',
    difficulty: 'EASY' | 'MEDIUM' | 'HARD' = 'EASY'
  ) {
    this.mapWidth = MAP.SIZE[size];
    this.mapHeight = MAP.SIZE[size];
    this.difficulty = difficulty;
  }

  public generateMap(): BigTile[] {
    this.initializeBigTileGrid();

    // this.generateEmptySpaces();

    this.placeCastle();

    this.placePortals();

    this.generatePaths();

    return this.convertToBigTiles();
  }

  private initializeBigTileGrid(): void {
    this.bigTileGrid = [];
    for (let z = 0; z < this.mapHeight; z++) {
      const row: BigTileCell[] = [];
      for (let x = 0; x < this.mapWidth; x++) {
        row.push({
          x,
          z,
          isEmpty: false,
          hasSpecial: false,
          pathEnter: 'none',
          pathExit: 'none',
        });
      }
      this.bigTileGrid.push(row);
    }
  }

  // private generateEmptySpaces(): void {
  //   for (let z = 0; z < this.mapHeight; z++) {
  //     for (let x = 0; x < this.mapWidth; x++) {
  //       if (Math.random() < MAP.PROBABILITIES.EMPTY) {
  //         this.bigTileGrid[z][x].isEmpty = true;
  //       }
  //     }
  //   }
  // }

  private placeCastle(): void {
    const centerX = Math.floor(Math.random() * this.mapWidth);
    const centerZ = Math.floor(Math.random() * this.mapHeight);

    this.bigTileGrid[centerZ][centerX].isEmpty = false;
    this.bigTileGrid[centerZ][centerX].hasSpecial = true;
    this.bigTileGrid[centerZ][centerX].specialType = 'castle';

    this.castle = this.bigTileGrid[centerZ][centerX];
  }

  private placePortals(): void {
    const portalCount = MAP.PORTAL_COUNT[this.difficulty];
    this.portals = [];

    const perimeterPositions: { x: number; z: number }[] = [];

    for (let x = 0; x < this.mapWidth; x++) {
      perimeterPositions.push({ x, z: 0 });
      perimeterPositions.push({ x, z: this.mapHeight - 1 });
    }

    for (let z = 1; z < this.mapHeight - 1; z++) {
      perimeterPositions.push({ x: 0, z });
      perimeterPositions.push({ x: this.mapWidth - 1, z });
    }

    this.shuffleArray(perimeterPositions);

    for (let i = 0; i < Math.min(portalCount, perimeterPositions.length); i++) {
      const pos = perimeterPositions[i];
      const bigTileCell = this.bigTileGrid[pos.z][pos.x];

      bigTileCell.isEmpty = false;
      bigTileCell.hasSpecial = true;
      bigTileCell.specialType = 'portal';

      if (pos.z === 0) {
        bigTileCell.pathExit = 'south';
      } else if (pos.z === this.mapHeight - 1) {
        bigTileCell.pathExit = 'north';
      } else if (pos.x === 0) {
        bigTileCell.pathExit = 'east';
      } else {
        bigTileCell.pathExit = 'west';
      }

      this.portals.push(bigTileCell);
    }
  }

  private shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  private generatePaths(): void {
    if (!this.castle) return;

    this.paths = [];

    for (const portal of this.portals) {
      const path = this.findPath(portal, this.castle);

      if (path) {
        for (const cell of path) {
          cell.isEmpty = false;
        }

        this.calculatePathDirections(path);

        this.paths.push(path);
      }
    }
  }

  private calculatePathDirections(path: BigTileCell[]): void {
    if (path.length < 2) return;

    const portal = path[0];
    const nextTile = path[1];

    if (nextTile.x > portal.x) {
      portal.pathExit = 'east';
    } else if (nextTile.x < portal.x) {
      portal.pathExit = 'west';
    } else if (nextTile.z > portal.z) {
      portal.pathExit = 'south';
    } else if (nextTile.z < portal.z) {
      portal.pathExit = 'north';
    }

    for (let i = 1; i < path.length; i++) {
      const current = path[i];

      if (i === path.length - 1) {
        const prev = path[i - 1];
        const dx = current.x - prev.x;
        const dz = current.z - prev.z;

        if (dx > 0) current.pathEnter = 'west';
        else if (dx < 0) current.pathEnter = 'east';
        else if (dz > 0) current.pathEnter = 'north';
        else if (dz < 0) current.pathEnter = 'south';

        current.pathExit = 'none';
        continue;
      } else {
        const prev = path[i - 1];
        const next = path[i + 1];

        const dxPrev = current.x - prev.x;
        const dzPrev = current.z - prev.z;

        if (dxPrev > 0) current.pathEnter = 'west';
        else if (dxPrev < 0) current.pathEnter = 'east';
        else if (dzPrev > 0) current.pathEnter = 'north';
        else if (dzPrev < 0) current.pathEnter = 'south';

        const dxNext = next.x - current.x;
        const dzNext = next.z - current.z;

        if (dxNext > 0) current.pathExit = 'east';
        else if (dxNext < 0) current.pathExit = 'west';
        else if (dzNext > 0) current.pathExit = 'south';
        else if (dzNext < 0) current.pathExit = 'north';
      }

      if (current.pathEnter === current.pathExit) {
        if (current.pathEnter === 'north' || current.pathEnter === 'south') {
          current.pathExit = Math.random() < 0.5 ? 'east' : 'west';
        } else {
          current.pathExit = Math.random() < 0.5 ? 'north' : 'south';
        }
      }
    }

    for (let i = 0; i < path.length - 1; i++) {
      const current = path[i];
      const next = path[i + 1];

      if (current.pathExit === 'north' && next.pathEnter !== 'south') {
        next.pathEnter = 'south';
      } else if (current.pathExit === 'south' && next.pathEnter !== 'north') {
        next.pathEnter = 'north';
      } else if (current.pathExit === 'east' && next.pathEnter !== 'west') {
        next.pathEnter = 'west';
      } else if (current.pathExit === 'west' && next.pathEnter !== 'east') {
        next.pathEnter = 'east';
      }
    }
  }

  private findPath(start: BigTileCell, end: BigTileCell): BigTileCell[] | null {
    for (let z = 0; z < this.mapHeight; z++) {
      for (let x = 0; x < this.mapWidth; x++) {
        this.bigTileGrid[z][x].visited = false;
        this.bigTileGrid[z][x].distance = Infinity;
        this.bigTileGrid[z][x].parent = undefined;
      }
    }

    start.distance = 0;

    const queue: BigTileCell[] = [start];

    while (queue.length > 0) {
      queue.sort((a, b) => (a.distance || 0) - (b.distance || 0));

      const current = queue.shift();

      if (!current) break;

      if (current.x === end.x && current.z === end.z) {
        return this.reconstructPath(current);
      }

      current.visited = true;

      const directions = [
        { x: 0, z: -1 },
        { x: 1, z: 0 },
        { x: 0, z: 1 },
        { x: -1, z: 0 },
      ];

      for (const dir of directions) {
        const newX = current.x + dir.x;
        const newZ = current.z + dir.z;

        if (
          newX < 0 ||
          newX >= this.mapWidth ||
          newZ < 0 ||
          newZ >= this.mapHeight
        ) {
          continue;
        }

        const neighbor = this.bigTileGrid[newZ][newX];

        if (neighbor.visited) continue;

        const baseCost = 1;
        const emptyCost = neighbor.isEmpty ? 2 : 0;
        const newDist = (current.distance || 0) + baseCost + emptyCost;

        if (newDist < (neighbor.distance || Infinity)) {
          neighbor.distance = newDist;
          neighbor.parent = current;

          if (!queue.includes(neighbor)) {
            queue.push(neighbor);
          }
        }
      }
    }

    return null;
  }

  private reconstructPath(end: BigTileCell): BigTileCell[] {
    const path: BigTileCell[] = [];
    let current: BigTileCell | undefined = end;

    while (current) {
      path.unshift(current);
      current = current.parent;
    }

    return path;
  }

  private convertToBigTiles(): BigTile[] {
    const bigTiles: BigTile[] = [];

    for (let z = 0; z < this.mapHeight; z++) {
      for (let x = 0; x < this.mapWidth; x++) {
        const cell = this.bigTileGrid[z][x];

        if (cell.isEmpty) continue;

        const id = `bigtile-${x}-${z}-${Math.random().toString(36).substring(2, 9)}`;

        const tilesMatrix = this.generateSmallTilesForBigTile(cell);

        bigTiles.push({
          id,
          position: {
            x: x * BIG_TILE.SPACING - (this.mapWidth * BIG_TILE.SPACING) / 2,
            y: 0,
            z: z * BIG_TILE.SPACING - (this.mapHeight * BIG_TILE.SPACING) / 2,
          },
          tiles: tilesMatrix,
          isEmpty: false,
          hasSpecial: cell.hasSpecial,
          specialType: cell.specialType,
          pathEnter: cell.pathEnter,
          pathExit: cell.pathExit,
        });
      }
    }

    return bigTiles;
  }

  private generateSmallTilesForBigTile(bigTileCell: BigTileCell): Tile[][] {
    const gridSize = BIG_TILE.GRID_SIZE;
    const result: Tile[][] = [];

    const isPathTile = this.isOnPath(bigTileCell);
    const isCastleTile = bigTileCell.specialType === 'castle';
    const isPortalTile = bigTileCell.specialType === 'portal';

    const enterDir = bigTileCell.pathEnter || 'none';
    const exitDir = bigTileCell.pathExit || 'none';

    for (let z = 0; z < gridSize; z++) {
      const row: Tile[] = [];

      for (let x = 0; x < gridSize; x++) {
        let tileType: TileType = TERRAIN.GRASS;

        const isTopRow = z === 0;
        const isBottomRow = z === gridSize - 1;
        const isLeftCol = x === 0;
        const isRightCol = x === gridSize - 1;

        const isCenterX = x === Math.floor(gridSize / 2);
        const isCenterZ = z === Math.floor(gridSize / 2);
        const isCenter = isCenterX && isCenterZ;

        if (isCastleTile && isCenter) {
          tileType = TERRAIN.CASTLE;
        } else if (isPortalTile && isCenter) {
          tileType = TERRAIN.PORTAL;
        } else if (isPathTile) {
          let isOnPath = false;

          if (isCenter) {
            isOnPath = true;
          }

          if (enterDir === 'north' && isCenterX && isTopRow) {
            isOnPath = true;
          } else if (enterDir === 'south' && isCenterX && isBottomRow) {
            isOnPath = true;
          } else if (enterDir === 'west' && isLeftCol && isCenterZ) {
            isOnPath = true;
          } else if (enterDir === 'east' && isRightCol && isCenterZ) {
            isOnPath = true;
          }

          if (exitDir === 'north' && isCenterX && isTopRow) {
            isOnPath = true;
          } else if (exitDir === 'south' && isCenterX && isBottomRow) {
            isOnPath = true;
          } else if (exitDir === 'west' && isLeftCol && isCenterZ) {
            isOnPath = true;
          } else if (exitDir === 'east' && isRightCol && isCenterZ) {
            isOnPath = true;
          }

          if (
            (isCenterX &&
              ((enterDir === 'north' && z < Math.floor(gridSize / 2)) ||
                (enterDir === 'south' && z > Math.floor(gridSize / 2)))) ||
            (isCenterZ &&
              ((enterDir === 'west' && x < Math.floor(gridSize / 2)) ||
                (enterDir === 'east' && x > Math.floor(gridSize / 2))))
          ) {
            isOnPath = true;
          }

          if (
            (isCenterX &&
              ((exitDir === 'north' && z < Math.floor(gridSize / 2)) ||
                (exitDir === 'south' && z > Math.floor(gridSize / 2)))) ||
            (isCenterZ &&
              ((exitDir === 'west' && x < Math.floor(gridSize / 2)) ||
                (exitDir === 'east' && x > Math.floor(gridSize / 2))))
          ) {
            isOnPath = true;
          }

          if (isOnPath) {
            tileType = TERRAIN.PATH;
          } else if (Math.random() < MAP.PROBABILITIES.MOUNTAIN) {
            tileType = TERRAIN.MOUNTAIN;
          }
        } else {
          if (Math.random() < MAP.PROBABILITIES.MOUNTAIN) {
            tileType = TERRAIN.MOUNTAIN;
          }
        }

        const id = `smalltile-${bigTileCell.x}-${bigTileCell.z}-${x}-${z}-${Math.random().toString(36).substring(2, 5)}`;

        const isCastle = tileType === TERRAIN.CASTLE;
        const isPortal = tileType === TERRAIN.PORTAL;
        const isPath = tileType === TERRAIN.PATH;
        const isTower = tileType === TERRAIN.GRASS && !isPath;

        row.push({
          id,
          position: {
            x: (x - Math.floor(gridSize / 2)) / 2,
            y: 0,
            z: (z - Math.floor(gridSize / 2)) / 2,
          },
          startPath: { x: 0, y: 0, z: 0 },
          endPath: { x: 0, y: 0, z: 0 },
          type: tileType,
          isCastle,
          isPortal,
          isPath,
          isTower,
        });
      }

      result.push(row);
    }

    return result;
  }

  private isOnPath(bigTileCell: BigTileCell): boolean {
    for (const path of this.paths) {
      for (const cell of path) {
        if (cell.x === bigTileCell.x && cell.z === bigTileCell.z) {
          return true;
        }
      }
    }
    return false;
  }
}
