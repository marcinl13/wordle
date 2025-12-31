import { useCallback } from "react";
import useCookieSealedState from "@/hooks/useCookieSealedState";
import type { Difficulty } from "@/const/difficulty";
import { STORAGE_KEY } from "@/const/cookies";

export default function useDailyGuesses(difficulty: Difficulty) {
  const cookieExpireAtNextUtcMidnight = (() => {
    const now = new Date();
    return new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + 1,
        0,
        0,
        0,
      ),
    );
  })();

  const [guesses, setGuesses, resetGuesses] = useCookieSealedState<string[]>(
    STORAGE_KEY[difficulty],
    [],
    {
      secret: process.env.NEXT_PUBLIC_DAILY_GUESS_SECRET as string | undefined,
      cookieOptions: { expires: cookieExpireAtNextUtcMidnight },
    },
  );

  const addGuess = useCallback(
    (guess: string) => setGuesses((prev) => [...prev, guess]),
    [setGuesses],
  );

  return { guesses, addGuess, resetGuesses };
}
