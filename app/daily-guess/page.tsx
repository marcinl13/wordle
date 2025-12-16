import "server-only";
import { Game } from "./game";
import { getDailyWord } from "@/lib/dailyWord";

export default function Home() {
  const word = getDailyWord();

  return (
    <main className="container">
      <h1 className="text-4xl font-bold text-center">Daily Word Guess</h1>

      <Game dailyWord={word} />
    </main>
  );
}
