import "server-only";
import type { Difficulty } from "./getDifficultyFromSearchParams";
import normalData from "@/data/en/normal.json";
import hardData from "@/data/en/hard.json";

export function getDailyWord(difficulty: Difficulty) {
  const dayIndex = Math.floor(Date.now() / 1000 / 60 / 60 / 24);
  const words = difficulty === "hard" ? hardData.words : normalData.words;

  return words[dayIndex % words.length];
}
