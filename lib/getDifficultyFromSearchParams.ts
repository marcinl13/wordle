import type { Difficulty } from "@/const/difficulty";

type SearchParams = Record<string, string | string[] | undefined>;

export function getDifficultyFromSearchParams(
  params: SearchParams,
): Difficulty {
  if (!params) return "normal";

  if (Object.hasOwn(params, "difficulty")) {
    const difficulty = params.difficulty;

    if (difficulty === "hard") return "hard";

    return "normal";
  }

  return "normal";
}
