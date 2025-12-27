export const DIFFICULTIES = ["normal", "hard"] as const;

export type Difficulty = (typeof DIFFICULTIES)[number];
