import type { Difficulty } from "./difficulty";

export const STORAGE_KEY: Record<Difficulty, string> = {
  normal: "daily-guess:guesses:normal",
  hard: "daily-guess:guesses:hard",
};
