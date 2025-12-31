export const GameStates = {
  WON: "won",
  LOST: "lost",
  PLAYING: "playing",
} as const;

export type GameState = (typeof GameStates)[keyof typeof GameStates];
