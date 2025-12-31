"use client";
import GuessInput from "@/components/GuessInput";
import GuessRow from "@/components/GuessRow";
import { CHANCES } from "@/const/chances";
import type { Difficulty } from "@/const/difficulty";
import useDailyGuesses from "@/hooks/useDailyGuesses";
import { Activity, useState } from "react";

export function Game({
  dailyWord,
  difficulty,
}: {
  dailyWord: string;
  difficulty: Difficulty;
}) {
  const [won, setWon] = useState(false);
  const { guesses, addGuess } = useDailyGuesses(difficulty);

  return (
    <>
      <div className="flex flex-col items-center space-y-2 mb-6">
        {Array.from({ length: CHANCES[difficulty] }).map((_, i) => (
          <GuessRow key={i} guess={guesses[i]} dailyWord={dailyWord} />
        ))}
      </div>

      <Activity mode={!won ? "visible" : "hidden"}>
        <GuessInput
          maxLength={dailyWord.length}
          onSubmit={(guess) => {
            const lower = guess.toLowerCase();
            addGuess(lower);

            if (lower === dailyWord) setWon(true);
          }}
        />
      </Activity>

      <Activity mode={won ? "visible" : "hidden"}>
        <p className="text-center mt-4 text-green-400 text-xl">
          🎉 You guessed the word!
        </p>
      </Activity>
    </>
  );
}
