"use client";

import { useId, useState } from "react";
import { landing } from "@/content/landing";
import { PhoneFrame } from "@/components/mockups/parts";
import { CheckIcon } from "@/components/ui/CheckIcon";

const t = landing.welcome;

// Interaktywny podgląd powitania: wybór odpowiedzi zmienia podgląd planu. Nic nie jest zapisywane.
export function WelcomePreview({ className = "" }: { className?: string }) {
  const [choice, setChoice] = useState(0);
  const id = useId();
  return (
    <PhoneFrame className={className}>
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-moss">{t.step}</p>
      <p id={`${id}-q`} className="mt-1 font-serif text-xl font-medium leading-tight" style={{ fontVariationSettings: '"SOFT" 50' }}>
        {t.question}
      </p>
      <div role="group" aria-labelledby={`${id}-q`} className="mt-3 flex flex-col gap-2">
        {t.options.map((o, i) => (
          <button
            key={o.label}
            type="button"
            aria-pressed={choice === i}
            onClick={() => setChoice(i)}
            className={`min-h-11 rounded-full border-[1.5px] px-4 text-left text-sm font-semibold transition duration-200 ease-calm active:scale-[0.98] ${
              choice === i ? "border-spruce bg-spruce text-snow" : "border-line bg-paper hover:border-spruce"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-cream p-3">
        <p className="text-xs text-moss">{t.planTitle}</p>
        <ul aria-live="polite" className="mt-2 space-y-1.5">
          {t.options[choice].plan.map((step) => (
            <li key={step} className="flex items-center gap-2 text-sm font-medium">
              <CheckIcon className="h-4 w-4 shrink-0 text-cranberry" />
              {step}
            </li>
          ))}
        </ul>
      </div>
    </PhoneFrame>
  );
}
