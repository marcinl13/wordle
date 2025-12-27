import "server-only";
import { Game } from "./game";
import { getDailyWord } from "@/lib/dailyWord";
import { getDifficultyFromSearchParams } from "@/lib/getDifficultyFromSearchParams";

export default async function Home({
  searchParams,
}: PageProps<"/daily-guess">) {
  const difficulty = getDifficultyFromSearchParams(await searchParams);
  const dailyWord = getDailyWord(difficulty);

  return (
    <main className="container">
      <h1 className="text-4xl font-bold text-center">Daily Word Guess</h1>
      <h2 className="text-2xl font-bold text-center text-orange-400 uppercase">
        {difficulty}
      </h2>

      <Game dailyWord={dailyWord} difficulty={difficulty} />
    </main>
  );
}
