import { createStore } from 'effector';
import { GameState, IGameState } from './GameState';
import * as GameEvents from './GameStateEvent';

export const $gameState = createStore<IGameState>(GameState);

$gameState
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
  .reset(GameEvents.resetGameState);
