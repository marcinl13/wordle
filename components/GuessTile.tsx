import clsx from "clsx";
import type { LetterStatus } from "@/const/letterStatus";

type Props = {
  letter: string;
  status: LetterStatus;
};

export default function GuessTile({ letter, status }: Props) {
  return (
    <div
      className={clsx(
        "w-12 h-12 flex items-center justify-center rounded border border-gray-700",
        "text-xl font-bold uppercase",
        status === "empty" && "bg-white",
        status === "correct" && "bg-green-400",
        status === "present" && "bg-yellow-400",
        status === "absent" && "bg-gray-400",
      )}
    >
      {letter}
    </div>
  );
}
