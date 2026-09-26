"use client";

import { useState } from "react";
import { landing } from "@/content/landing";
import { Container } from "@/components/ui/Container";
import { Rich } from "@/components/ui/Rich";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { MockCard } from "@/components/mockups/parts";
import { LockIcon } from "@/components/mockups/Mockups";

const t = landing.details;
const p = t.panels;

// Ilustracje w panelu obok listy (ozdobne – ta sama treść jest w liście po lewej)
function PanelVisual({ id }: { id: string }) {
  switch (id) {
    case "sekret":
      return (
        <div className="w-full max-w-sm space-y-3">
          <MockCard>
            <p className="font-bold">{p.sekret.title}</p>
            <p className="text-sm text-moss">{p.sekret.line}</p>
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-sage px-3 py-1 text-xs font-bold">
              <LockIcon /> {p.sekret.badge}
            </p>
          </MockCard>
          <MockCard className="ml-10 border-dashed">
            <p className="text-sm text-moss">{p.sekret.hidden}</p>
          </MockCard>
        </div>
      );
    case "babcia":
      return (
        <MockCard className="w-full max-w-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage font-serif text-lg">B</span>
            <div>
              <p className="font-bold">{p.babcia.name}</p>
              <p className="text-sm text-moss">{p.babcia.status}</p>
            </div>
          </div>
          <p className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-full bg-cranberry text-sm font-semibold text-paper">
            <CheckIcon className="h-4 w-4" /> {p.babcia.button}
          </p>
        </MockCard>
      );
    case "plan":
      return (
        <MockCard className="w-full max-w-sm">
          <p className="font-bold">{p.plan.title}</p>
          <ul className="mt-2 divide-y divide-line">
            {p.plan.rows.map(([when, what]) => (
              <li key={when} className="flex justify-between gap-4 py-2 text-sm">
                <span className="text-moss">{when}</span>
                <span className="text-right font-medium">{what}</span>
              </li>
            ))}
          </ul>
        </MockCard>
      );
    case "link":
      return (
        <MockCard className="w-full max-w-sm text-center">
          <p className="font-bold">{p.link.title}</p>
          <p className="mt-3 rounded-full border border-line bg-cream px-4 py-2 text-sm">{p.link.url}</p>
          <p className="mt-3 flex min-h-11 items-center justify-center rounded-full bg-spruce text-sm font-semibold text-snow">
            {p.link.button}
          </p>
          <p className="mt-2 text-xs text-moss">{p.link.note}</p>
        </MockCard>
      );
    default:
      return (
        <MockCard className="w-full max-w-sm">
          <p className="text-sm text-moss">{p.zyczenia.for}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {p.zyczenia.tones.map((tone, i) => (
              <span
                key={tone}
                className={`rounded-full px-3 py-1 text-xs font-bold ${i === 0 ? "bg-spruce text-snow" : "bg-cream text-moss"}`}
              >
                {tone}
              </span>
            ))}
          </div>
          <p className="mt-3 rounded-xl bg-cream p-3 font-serif text-[1.0625rem] italic leading-relaxed">{p.zyczenia.text}</p>
        </MockCard>
      );
  }
}

export function Details() {
  const [active, setActive] = useState(0);
  return (
    <section id="szczegoly" aria-labelledby="details-title" className="border-b border-line">
      <Container flush className="grid lg:grid-cols-[28rem_1fr]">
        <div className="px-5 py-14 md:px-10 lg:border-r lg:border-line lg:py-16">
          <h2 id="details-title" className="text-2xl leading-8 tracking-[-0.03em] lg:text-[2rem] lg:leading-10">
            <Rich text={t.title} />
          </h2>
          <ul className="mt-8 lg:mt-24">
            {t.items.map((item, i) => {
              const open = active === i;
              return (
                <li key={item.id} className="border-b border-line">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`detail-${item.id}`}
                      onClick={() => setActive(i)}
                      className={`flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left font-semibold transition-colors duration-200 ${
                        open ? "text-spruce" : "text-moss hover:text-spruce"
                      }`}
                    >
                      {item.title}
                      <span aria-hidden="true" className={`transition-transform duration-300 ease-calm ${open ? "translate-x-1" : ""}`}>
                        →
                      </span>
                    </button>
                  </h3>
                  <div id={`detail-${item.id}`} hidden={!open} className="pb-5">
                    <p className="text-base text-moss">{item.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="px-5 pb-14 md:px-10 lg:p-3">
          <div
            aria-hidden="true"
            className="flex h-[22rem] items-center justify-center rounded-panel bg-cranberry-deep px-6 sm:h-[28rem] lg:h-full lg:min-h-[40rem]"
          >
            <div key={t.items[active].id} className="rise-in flex w-full justify-center">
              <PanelVisual id={t.items[active].id} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
