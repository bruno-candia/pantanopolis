import { createStore } from 'effector';
import GameSettingState from './GameSettingState';
import * as GameEvents from './GameSettingEvent';

export const $gameSetting = createStore(GameSettingState);

$gameSetting
  .on(GameEvents.setGameStart, state => {
    return {
      ...state,
      gameStarted: true,
      gameOver: false,
    };
  })
  .on(GameEvents.setGameEnd, state => {
    return {
      ...state,
      gameStarted: false,
      gameOver: true,
    };
  })
  .on(GameEvents.setGameReset, state => {
    return {
      ...state,
      gameStarted: false,
      gameOver: false,
    };
  })
  .on(GameEvents.setMusicEnabled, state => {
    return {
      ...state,
      musicEnabled: !state.musicEnabled,
    };
  });
