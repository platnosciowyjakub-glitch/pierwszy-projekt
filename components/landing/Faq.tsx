"use client";

import { useState } from "react";
import { landing } from "@/content/landing";
import { Container } from "@/components/ui/Container";
import { Rich } from "@/components/ui/Rich";

const t = landing.faq;

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="pytania" aria-labelledby="faq-title" className="border-t border-line bg-cream py-16 lg:py-24">
      <Container className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <h2 id="faq-title" className="text-[2rem] leading-10 tracking-[-0.04em] lg:text-5xl lg:leading-[3.25rem]">
          <Rich text={t.title} />
        </h2>
        <ul className="border-t border-line">
          {t.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left text-lg font-semibold"
                  >
                    {item.q}
                    <svg
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      className={`h-4 w-4 shrink-0 text-cranberry transition-transform duration-300 ease-calm ${isOpen ? "rotate-45" : ""}`}
                    >
                      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </button>
                </h3>
                <div id={`faq-${i}`} hidden={!isOpen} className="pb-6 pr-10">
                  <p className="text-moss">{item.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
