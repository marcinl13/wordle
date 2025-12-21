import { evaluateStatus } from "@/lib/evaluateStatus";
import GuessTile from "./GuessTile";

type Props = {
  guess?: string;
  dailyWord: string;
};

export default function GuessRow({ guess = "", dailyWord }: Props) {
  const tiles = Array.from({ length: dailyWord.length }).map((_, i) => {
    const letter = guess[i] || "";
    const status = evaluateStatus(guess, dailyWord, i);

    return <GuessTile key={i} letter={letter} status={status} />;
  });

  return <div className="flex gap-2">{tiles}</div>;
}
