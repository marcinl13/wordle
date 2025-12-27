import Link from "next/link";
import GuessRow from "@/components/GuessRow";

const dailyWord = "REACT";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero */}
        <section className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Daily Word — a fresh word puzzle every day
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-300">
              One daily challenge, five tries, and an easy-to-learn gameplay
              that sharpens your mind. Quick to play, built for accessibility
              and privacy-first by design.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/daily-guess"
                className="inline-flex items-center rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700"
              >
                Play Today
              </Link>
              <a
                href="#features"
                className="inline-flex items-center rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-200"
              >
                How it works
              </a>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded-md bg-white px-4 py-3 shadow-sm dark:bg-zinc-900">
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Quick play
                </div>
                <div className="text-xl font-semibold">~1 min / day</div>
              </div>
              <div className="rounded-md bg-white px-4 py-3 shadow-sm dark:bg-zinc-900">
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  No account needed
                </div>
                <div className="text-xl font-semibold">Privacy-first</div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 text-sm font-medium text-zinc-500">
                Preview
              </div>

              <div className="space-y-2">
                <GuessRow guess="CRANK" dailyWord={dailyWord} />
                <GuessRow guess="BLOAT" dailyWord={dailyWord} />
                <GuessRow guess="REACT" dailyWord={dailyWord} />
                <GuessRow guess="" dailyWord={dailyWord} />
                <GuessRow guess="" dailyWord={dailyWord} />
                <GuessRow guess="" dailyWord={dailyWord} />
              </div>

              <div className="mt-5 text-xs text-zinc-500">
                Try to guess the five-letter word in six attempts.
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mt-16">
          <h2 className="text-2xl font-bold">Features</h2>
          <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-300">
            Designed to be fast, accessible, and fun — here are a few things
            that make the game enjoyable.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex gap-4 rounded-md bg-white p-4 shadow-sm dark:bg-zinc-900">
              <svg
                className="h-8 w-8 text-indigo-600"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2v6l4-2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <div>
                <div className="font-semibold">Daily puzzle</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  A new word every day keeps the challenge fresh.
                </div>
              </div>
            </div>

            <div className="flex gap-4 rounded-md bg-white p-4 shadow-sm dark:bg-zinc-900">
              <svg
                className="h-8 w-8 text-yellow-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2v20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12h20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <div className="font-semibold">Quick & focused</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  Play in under a minute — perfect for a short break.
                </div>
              </div>
            </div>

            <div className="flex gap-4 rounded-md bg-white p-4 shadow-sm dark:bg-zinc-900">
              <svg
                className="h-8 w-8 text-green-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <div className="font-semibold">Accessible</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  Keyboard-first controls and screen-reader friendly UI.
                </div>
              </div>
            </div>

            <div className="flex gap-4 rounded-md bg-white p-4 shadow-sm dark:bg-zinc-900">
              <svg
                className="h-8 w-8 text-zinc-700"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 12h18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 3v18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <div className="font-semibold">Privacy-first</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  No signups needed — your play history stays local.
                </div>
              </div>
            </div>

            <div className="flex gap-4 rounded-md bg-white p-4 shadow-sm dark:bg-zinc-900">
              <svg
                className="h-8 w-8 text-pink-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20 21V7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 21V11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <div className="font-semibold">Shareable</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  Share results with friends while preserving privacy.
                </div>
              </div>
            </div>

            <div className="flex gap-4 rounded-md bg-white p-4 shadow-sm dark:bg-zinc-900">
              <svg
                className="h-8 w-8 text-indigo-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7z"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <div className="font-semibold">Extendable</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  Open to features like stats, leaderboards, and modes.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Engagement */}
        <section className="mt-16 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold">What players say</h3>
            <div className="mt-4 space-y-4">
              <blockquote className="rounded-md bg-white p-4 shadow-sm dark:bg-zinc-900">
                “Perfect little daily puzzle — quick, clever, and addictive.”
                <div className="mt-2 text-sm font-medium text-zinc-500">
                  — Beta player
                </div>
              </blockquote>

              <blockquote className="rounded-md bg-white p-4 shadow-sm dark:bg-zinc-900">
                “I love the simple interface and keyboard controls.”
                <div className="mt-2 text-sm font-medium text-zinc-500">
                  — Accessibility tester
                </div>
              </blockquote>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 flex items-center justify-center">
          <Link
            href="/daily-guess"
            className="inline-flex items-center gap-3 rounded-full bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow hover:bg-indigo-700"
          >
            Play Now — Today’s puzzle
          </Link>
        </section>

        <footer className="mt-16 text-center text-sm text-zinc-500">
          Built with ❤️ — open source and extensible.
        </footer>
      </div>
    </main>
  );
}
