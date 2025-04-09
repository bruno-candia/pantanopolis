export interface IGameState {
  gameStarted: boolean;
  gameOver: boolean;
}

export const GameState: IGameState = {
  gameStarted: false,
  gameOver: false,
};
