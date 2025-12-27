export const LETTER_STATUS = ["correct", "present", "absent", "empty"] as const;

export type LetterStatus = (typeof LETTER_STATUS)[number];
