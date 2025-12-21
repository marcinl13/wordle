export type LetterState = "correct" | "present" | "absent" | "empty";

type EvaluatedLetter = {
  letter: string;
  state: LetterState;
};

/**
 * Evaluate a guess against the solution.
 * - If `guess` is shorter than `solution`, missing letters become `empty`.
 * - Handles duplicate letters correctly by tracking which solution letters are used.
 */
export function evaluateGuess(
  guess: string,
  solution: string,
): EvaluatedLetter[] {
  const length = solution.length;
  const result: EvaluatedLetter[] = Array(length);
  const solutionChars = solution.split("");

  // Track which solution letters are already matched
  const used = Array(length).fill(false);

  // 1️⃣ First pass: exact matches (only where guess has a letter)
  for (let i = 0; i < length; i++) {
    const g = guess[i];
    if (g && g === solution[i]) {
      result[i] = { letter: g, state: "correct" };
      used[i] = true;
    }
  }

  // 2️⃣ Second pass: present / absent / empty
  for (let i = 0; i < length; i++) {
    const g = guess[i];

    if (!g) {
      result[i] = { letter: "", state: "empty" };
      continue;
    }

    if (result[i]) continue; // already correct

    let found = false;

    for (let j = 0; j < length; j++) {
      if (!used[j] && solutionChars[j] === g) {
        found = true;
        used[j] = true;
        break;
      }
    }

    result[i] = {
      letter: g,
      state: found ? "present" : "absent",
    };
  }

  return result;
}
