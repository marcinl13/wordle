import { useCallback, useMemo } from "react";
import useCookieSealedState from "@/hooks/useCookieSealedState";
import { CHANCES } from "@/const/chances";
import type { Difficulty } from "@/const/difficulty";
import { STORAGE_KEY } from "@/const/cookies";
import type { GameState } from "@/const/gameState";

export default function useDailyGuesses(
  difficulty: Difficulty,
  dailyWord: string,
) {
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

  const maxAttempts = CHANCES[difficulty];

  const isWon = useMemo(() => {
    if (!dailyWord) return false;

    return guesses.includes(dailyWord);
  }, [dailyWord, guesses]);

  const attemptsLeft = Math.max(0, maxAttempts - guesses.length);

  const isPlaying = useMemo(() => {
    return dailyWord ? !isWon && attemptsLeft > 0 : true;
  }, [dailyWord, isWon, attemptsLeft]);

  const state: GameState = isWon ? "won" : isPlaying ? "playing" : "lost";

  const addGuess = useCallback(
    (guess: string) => {
      // prevent adding guesses if game is not active or already won
      if (!isPlaying || isWon) return;
      if (guesses.length >= maxAttempts) return;

      setGuesses((prev) => [...prev, guess]);
    },
    [setGuesses, isPlaying, isWon, guesses.length, maxAttempts],
  );

  return {
    guesses,
    addGuess,
    resetGuesses,
    state,
  };
}
