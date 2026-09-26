import type { ReactNode } from "react";
import { CheckIcon } from "@/components/ui/CheckIcon";

// Wspólne elementy makiet ekranów (przydadzą się też w samej aplikacji).

export function MockCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border-[1.5px] border-spruce bg-paper p-4 text-left text-spruce ${className}`}>{children}</div>
  );
}

export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[2rem] border-[1.5px] border-spruce bg-spruce p-1.5 ${className}`}>
      <div className="overflow-hidden rounded-[1.6rem] bg-paper px-4 pb-5 pt-3 text-left text-spruce">
        <div aria-hidden="true" className="mx-auto mb-4 h-1 w-12 rounded-full bg-line" />
        {children}
      </div>
    </div>
  );
}

export function Tick({ done, className = "" }: { done: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
        done ? "border-cranberry bg-cranberry text-paper" : "border-line bg-paper"
      } ${className}`}
    >
      {done && <CheckIcon className="h-3.5 w-3.5" />}
    </span>
  );
}

export function Initials({ letters }: { letters: readonly string[] }) {
  const tones = ["bg-sage", "bg-cream", "bg-sand"];
  return (
    <span aria-hidden="true" className="flex -space-x-1.5">
      {letters.map((l, i) => (
        <span
          key={l + i}
          className={`flex h-6 w-6 items-center justify-center rounded-full border border-paper text-[0.65rem] font-bold ${tones[i % 3]}`}
        >
          {l}
        </span>
      ))}
    </span>
  );
}

export const statusTone: Record<string, string> = {
  pomysł: "bg-cream text-moss",
  kupione: "bg-sage text-spruce",
  zapakowane: "bg-cranberry/10 text-cranberry",
  wręczone: "bg-spruce text-snow",
};
