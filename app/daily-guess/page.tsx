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

      <Game dailyWord={dailyWord} difficulty={difficulty} />
    </main>
  );
}
