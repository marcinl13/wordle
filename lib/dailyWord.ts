import "server-only";

const WORDS = [
  "apple",
  "chair",
  "plant",
  "table",
  "mouse",
  "brick",
  "candy",
  "light",
];

export function getDailyWord() {
  const dayIndex = Math.floor(Date.now() / 1000 / 60 / 60 / 24);
  return WORDS[dayIndex % WORDS.length];
}
