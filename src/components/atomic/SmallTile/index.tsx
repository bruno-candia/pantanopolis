import { useMemo } from 'react';
import { BoxGeometry, MeshStandardMaterial } from 'three';
import { COLORS, DIRECTIONS, TERRAIN, TILE } from '../../../constants';
import { PathDirection, TileType } from '../../../types/mapType';
import { Castle } from '../Castle';
import { Portal } from '../Portal';

export function SmallTile({
  type = TERRAIN.GRASS,
  pathEnter,
  pathExit,
}: {
  type?: TileType;
  pathEnter?: PathDirection;
  pathExit?: PathDirection;
}) {
  const tileConfig = useMemo(() => {
    const size = TILE.SIZE * TILE.SCALE.NORMAL;
    const height = TILE.HEIGHT * TILE.SCALE.NORMAL;
    const fullHeight = TILE.FULL_HEIGHT * TILE.SCALE.NORMAL;

    const bottomPos = TILE.POSITION.BOTTOM * TILE.SCALE.NORMAL;
    const topPos = TILE.POSITION.TOP * TILE.SCALE.NORMAL;

    const addMountainLevel = (size: number, height: number) => {
      const parts = [];
      const randomMountainLevel = Math.floor(1 + Math.random() * 3);
      for (let i = 0; i < randomMountainLevel; i++) {
        parts.push({
          geometry: new BoxGeometry(size, height, size),
          material: new MeshStandardMaterial({
            color: COLORS.GRASS,
            roughness: 0.6,
          }),
          position: [0, topPos + height * i, 0],
        });
      }
      return parts;
    };

    switch (type) {
      case TERRAIN.PATH:
        return {
          geometry: new BoxGeometry(size, height, size),
          material: new MeshStandardMaterial({
            color: COLORS.PATH,
            roughness: 0.8,
          }),
          position: [0, 0 + bottomPos, 0],
        };
      case TERRAIN.MOUNTAIN:
        return {
          geometry: new BoxGeometry(size, fullHeight, size),
          material: new MeshStandardMaterial({
            color: COLORS.GRASS,
            roughness: 0.6,
          }),
          position: [0, 0, 0],
          isComplex: true,
          parts: [
            {
              geometry: new BoxGeometry(size, height, size),
              material: new MeshStandardMaterial({
                color: COLORS.SAND,
                roughness: 0.8,
              }),
              position: [0, 0 + bottomPos, 0],
            },
            ...addMountainLevel(size, height),
          ],
        };
      case TERRAIN.CASTLE:
        console.log(pathEnter);
        return {
          geometry: new BoxGeometry(size, height, size),
          material: new MeshStandardMaterial({
            color: COLORS.SAND,
            roughness: 0.8,
          }),
          position: [0, bottomPos, 0],
          isModel: true,
          element: (
            <Castle
              scale={0.25}
              position={[0, 0.07, 0]}
              rotation={
                DIRECTIONS[pathEnter || 'east'] as [number, number, number]
              }
            />
          ),
        };
      case TERRAIN.PORTAL:
        return {
          geometry: new BoxGeometry(size, height, size),
          material: new MeshStandardMaterial({
            color: COLORS.SAND,
            roughness: 0.8,
          }),
          position: [0, bottomPos, 0],
          isModel: true,
          element: (
            <Portal
              scale={0.0003}
              position={[0, 0.09, 0]}
              rotation={
                DIRECTIONS[pathExit || 'east'] as [number, number, number]
              }
            />
          ),
        };
      case TERRAIN.GRASS:
      default:
        return {
          geometry: new BoxGeometry(size, fullHeight, size),
          material: new MeshStandardMaterial({
            color: COLORS.GRASS,
            roughness: 0.6,
          }),
          position: [0, 0, 0],
          isComplex: true,
          parts: [
            {
              geometry: new BoxGeometry(size, height, size),
              material: new MeshStandardMaterial({
                color: COLORS.SAND,
                roughness: 0.8,
              }),
              position: [0, 0 + bottomPos, 0],
            },
            {
              geometry: new BoxGeometry(size, height, size),
              material: new MeshStandardMaterial({
                color: COLORS.GRASS,
                roughness: 0.6,
              }),
              position: [0, 0 + topPos, 0],
            },
          ],
        };
    }
  }, [type]);

  if (tileConfig.isModel) {
    return (
      <mesh
        position={[
          tileConfig.position[0],
          tileConfig.position[1],
          tileConfig.position[2],
        ]}
        castShadow
        receiveShadow
      >
        {tileConfig.element}
        {tileConfig.geometry && <primitive object={tileConfig.geometry} />}
        {tileConfig.material && <primitive object={tileConfig.material} />}
      </mesh>
    );
  }

  if (tileConfig.isComplex) {
    return (
      <group>
        {tileConfig.parts?.map((part, index) => (
          <mesh
            key={index}
            position={[part.position[0], part.position[1], part.position[2]]}
            castShadow
            receiveShadow
          >
            <primitive object={part.geometry} />
            <primitive object={part.material} />
          </mesh>
        ))}
      </group>
    );
  }
  return (
    <mesh
      position={[
        tileConfig.position[0],
        tileConfig.position[1],
        tileConfig.position[2],
      ]}
      castShadow
      receiveShadow
    >
      {tileConfig.geometry && <primitive object={tileConfig.geometry} />}
      {tileConfig.material && <primitive object={tileConfig.material} />}
    </mesh>
  );
}
