import "server-only";
import type { Difficulty } from "@/const/difficulty";

const dataLoaders: Record<Difficulty, () => Promise<{ words: string[] }>> = {
  normal: () => import("@/data/en/normal.json").then((m) => m.default),
  hard: () => import("@/data/en/hard.json").then((m) => m.default),
};

export async function getDailyWord(difficulty: Difficulty) {
  const dayIndex = Math.floor(Date.now() / 1000 / 60 / 60 / 24);
  const { words } = await dataLoaders[difficulty]();

  return words[dayIndex % words.length];
}
