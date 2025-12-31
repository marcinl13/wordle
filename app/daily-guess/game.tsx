"use client";
import { Activity } from "react";
import GuessInput from "@/components/GuessInput";
import GuessRow from "@/components/GuessRow";
import { CHANCES } from "@/const/chances";
import type { Difficulty } from "@/const/difficulty";
import { GameStates } from "@/const/gameState";
import useDailyGuesses from "@/hooks/useDailyGuesses";

export function Game({
  dailyWord,
  difficulty,
}: {
  dailyWord: string;
  difficulty: Difficulty;
}) {
  const { guesses, addGuess, state } = useDailyGuesses(difficulty, dailyWord);

  return (
    <>
      <div className="flex flex-col items-center space-y-2 mb-6">
        {Array.from({ length: CHANCES[difficulty] }).map((_, i) => (
          <GuessRow key={i} guess={guesses[i]} dailyWord={dailyWord} />
        ))}
      </div>

      <Activity mode={state === GameStates.PLAYING ? "visible" : "hidden"}>
        <GuessInput
          maxLength={dailyWord.length}
          onSubmit={(guess) => addGuess(guess.toLowerCase())}
        />
      </Activity>

      <Activity mode={state === GameStates.WON ? "visible" : "hidden"}>
        <p className="text-center mt-4 text-green-400 text-xl">
          🎉 You guessed the word!
        </p>
      </Activity>

      <Activity mode={state === GameStates.LOST ? "visible" : "hidden"}>
        <p className="text-center mt-4 text-red-400 text-xl">
          😢 You ran out of guesses — the word was <strong>{dailyWord}</strong>
        </p>
      </Activity>
    </>
  );
}
