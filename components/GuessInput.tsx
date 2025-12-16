import { useState } from "react";

type Props = {
  onSubmit: (guess: string) => void;
  maxLength?: number;
}

export default function GuessInput({ onSubmit, maxLength = 5 }: Props) {
  const [input, setInput] = useState("");

  const submitGuess = () => {
    if (input.length !== maxLength) return;
    onSubmit(input.toLowerCase());
    setInput("");
  };

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <input
        className="flex-1 px-4 py-2 rounded border border-gray-700"
        maxLength={maxLength}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submitGuess()}
      />
      <button
        onClick={submitGuess}
        className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
      >
        Guess
      </button>
    </div>
  );
}
