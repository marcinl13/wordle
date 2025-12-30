import "server-only";
import type { Difficulty } from "@/const/difficulty";

const dataLoaders: Record<Difficulty, () => Promise<{ words: string[] }>> = {
  normal: () => import("@/data/en/normal.json").then((m) => m.default),
  hard: () => import("@/data/en/hard.json").then((m) => m.default),
};

function getUtcDayIndex(date: Date = new Date()): number {
  return Math.floor(date.getTime() / 86_400_000);
}

export async function getDailyWord(difficulty: Difficulty) {
  const dayIndex = getUtcDayIndex();
  const { words } = await dataLoaders[difficulty]();

  return words[dayIndex % words.length];
}
