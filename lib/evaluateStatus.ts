export type TileStatus = 'correct' | 'present' | 'absent' | 'empty';

export function evaluateStatus(
  guess: string,
  answer: string,
  index: number
): TileStatus {
  const letter = guess[index];
  if (!letter) return 'empty';
  if (letter === answer[index]) return 'correct';
  if (answer.includes(letter)) return 'present';
  return 'absent';
}