import { useCallback } from "react";
import usePersistentState from "@/hooks/usePersistentState";
import type { Difficulty } from "@/const/difficulty";

/**
 * Persist daily guesses in localStorage per word/day.
 *
 * By default this uses plain localStorage, but you can enable sealing with
 * `@hapi/iron` by providing the `encrypt` option and a `secret` (e.g.
 * `process.env.NEXT_PUBLIC_DAILY_GUESS_SECRET`).
 */
export default function useDailyGuesses(
  difficulty: Difficulty,
  options?: {
    encrypt?: boolean;
    secret?: string;
  },
) {
  const STORAGE_KEY = `daily-guess:guesses:${difficulty}`;
  const [guesses, setGuesses, resetGuesses] = usePersistentState<string[]>(
    STORAGE_KEY,
    [],
    {
      encrypt: options?.encrypt ?? false,
      secret:
        options?.secret ??
        (process.env.NEXT_PUBLIC_DAILY_GUESS_SECRET as string | undefined),
    },
  );

  const addGuess = useCallback(
    (guess: string) => setGuesses((prev) => [...prev, guess]),
    [setGuesses],
  );

  return { guesses, addGuess, resetGuesses };
}
