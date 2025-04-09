import { createEvent } from 'effector';

const setGameStart = createEvent('setGameStart');
const setGameEnd = createEvent('setGameEnd');
const resetGameState = createEvent<null>('resetGameState');
const setMusicEnabled = createEvent('setMusicEnabled');

export { resetGameState, setGameEnd, setGameStart, setMusicEnabled };
