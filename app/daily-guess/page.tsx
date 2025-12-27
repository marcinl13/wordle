import "server-only";
import { Game } from "./game";
import { getDailyWord } from "@/lib/dailyWord";
import { getDifficultyFromSearchParams } from "@/lib/getDifficultyFromSearchParams";

export default async function Page({
  searchParams,
}: PageProps<"/daily-guess">) {
  const difficulty = getDifficultyFromSearchParams(await searchParams);
  const dailyWord = getDailyWord(difficulty);

  return (
    <main className="container">
      <header className="text-center font-bold">
        <h1 className="text-4xl">Daily Word Guess</h1>
        <h2 className="text-2xl text-orange-400 uppercase">{difficulty}</h2>
      </header>

      {process.env.NODE_ENV === "development" && (
        <p className="text-center">{dailyWord}</p>
      )}

      <Game dailyWord={dailyWord} difficulty={difficulty} />
    </main>
  );
}
