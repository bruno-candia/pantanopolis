import { createEvent } from 'effector';
import { BigTile } from '../../types/mapType';

const setBigTiles = createEvent<BigTile[]>('setBigTiles');

export { setBigTiles };
