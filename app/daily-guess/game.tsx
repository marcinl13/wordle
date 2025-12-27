"use client";
import GuessInput from "@/components/GuessInput";
import GuessRow from "@/components/GuessRow";
import { CHANCES } from "@/const/chances";
import type { Difficulty } from "@/const/difficulty";
import { Activity, useState } from "react";

export function Game({
  dailyWord,
  difficulty,
}: {
  dailyWord: string;
  difficulty: Difficulty;
}) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [won, setWon] = useState(false);

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
            const newGuesses = [...guesses, guess.toLowerCase()];
            setGuesses(newGuesses);

            if (guess.toLowerCase() === dailyWord) setWon(true);
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
