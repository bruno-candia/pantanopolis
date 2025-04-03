import { createEvent } from 'effector';

const setGameStart = createEvent('setGameStart');
const setGameEnd = createEvent('setGameEnd');
const setGameReset = createEvent('setGameReset');
const setMusicEnabled = createEvent('setMusicEnabled');

export { setGameStart, setGameEnd, setGameReset, setMusicEnabled };
