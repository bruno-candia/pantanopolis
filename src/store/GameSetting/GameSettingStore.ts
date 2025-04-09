import { createStore } from 'effector';
import * as GameEvents from './GameSettingEvent';
import GameSettingState from './GameSettingState';

export const $gameSetting = createStore(GameSettingState);

$gameSetting.on(GameEvents.setMusicEnabled, state => {
  return {
    ...state,
    musicEnabled: !state.musicEnabled,
  };
});
