import { evaluateGuess } from "@/lib/evaluateGuess";
import GuessTile from "./GuessTile";

type Props = {
  guess?: string;
  dailyWord: string;
};

export default function GuessRow({ guess = "", dailyWord }: Props) {
  const evaluated = evaluateGuess(guess, dailyWord);

  const tiles = evaluated.map(({ letter, state }, i) => (
    <GuessTile key={i} letter={letter} status={state} />
  ));

  return <div className="flex gap-2">{tiles}</div>;
}
