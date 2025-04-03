import { createStore } from 'effector';
import * as MapEvents from './MapEvent';
import MapState from './MapState';

export const $map = createStore(MapState);

$map.on(MapEvents.setBigTiles, (state, payload) => {
  return {
    ...state,
    bigTiles: payload,
  };
});
