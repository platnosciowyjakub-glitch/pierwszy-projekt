import type { ReactNode } from "react";
import { prezenty } from "@/content/prezenty";
import { primaryAction } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Rich } from "@/components/ui/Rich";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { featureIcons } from "@/components/illustrations/FeatureIcons";
import { BudgetMock, GiftListMock, StagesMock, TogetherMock, WishlistMock } from "@/components/mockups/GiftMockups";

// Sekcje podstrony „Przygotuj prezenty”, w tym samym ciepłym stylu co strona główna.

const serifSoft = { fontVariationSettings: '"SOFT" 100' } as const;

function SectionTitle({ id, text, sub, center = true }: { id: string; text: string; sub?: string; center?: boolean }) {
  return (
    <div className={`reveal max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <h2 id={id} className="text-[2rem] leading-10 tracking-[-0.03em] lg:text-5xl lg:leading-[3.25rem]">
        <Rich text={text} />
      </h2>
      {sub && <p className="mt-4 text-lg text-moss">{sub}</p>}
    </div>
  );
}

export function GiftsHero() {
  const t = prezenty.hero;
  const cta = primaryAction();
  return (
    <section aria-labelledby="gifts-title" className="relative isolate overflow-hidden bg-cream">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_10%_0%,rgb(201_161_91/0.22),transparent_70%),radial-gradient(ellipse_50%_60%_at_95%_100%,rgb(168_68_58/0.08),transparent_70%)]"
      />
      <Container className="grid items-center gap-10 pb-14 pt-10 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:pb-24 lg:pt-20">
        <div className="max-w-[36rem]">
          <p className="rise-in text-sm font-semibold uppercase tracking-[0.1em] text-gold-text">{t.eyebrow}</p>
          <h1
            id="gifts-title"
            className="rise-in mt-3 font-serif text-[2.5rem] font-medium leading-[1.08] tracking-[-0.025em] sm:text-[3.25rem] lg:text-[4.25rem] lg:leading-[1.02] [&_.accent]:block [&_.accent]:font-normal [&_.accent]:italic [&_.accent]:text-cranberry"
            style={serifSoft}
          >
            <Rich text={t.title} />
          </h1>
          <p
            className="rise-in mt-6 text-lg leading-relaxed text-moss lg:mt-8 lg:text-[1.3125rem] lg:leading-[1.6]"
            style={{ "--delay": "120ms" } as React.CSSProperties}
          >
            {t.subtitle}
          </p>
          <div
            className="rise-in mt-8 flex flex-col gap-5 sm:flex-row sm:items-center lg:mt-10"
            style={{ "--delay": "240ms" } as React.CSSProperties}
          >
            <ButtonLink href={cta.href} className="min-h-[3.75rem] px-9 text-lg shadow-[0_10px_24px_-10px_rgb(168_68_58/0.55)]">
              {cta.label}
            </ButtonLink>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 sm:flex-col sm:gap-y-1.5">
              {t.trust.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-moss">
                  <span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-paper text-gold-text shadow-[0_0_0_1px_var(--color-line)]">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rise-in" style={{ "--delay": "360ms" } as React.CSSProperties}>
          <figure className="mx-auto max-w-[30rem] rotate-[-1deg] shadow-[0_30px_60px_-30px_rgb(31_58_46/0.35)] rounded-2xl">
            <GiftListMock />
            <figcaption className="sr-only">Przykładowa lista prezentów z budżetami i statusami</figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}

export function Compare() {
  const t = prezenty.compare;
  return (
    <section aria-labelledby="compare-title" className="py-16 lg:py-24">
      <Container>
        <SectionTitle id="compare-title" text={t.title} sub={t.text} />
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-[1fr_1.4fr] lg:mt-14 lg:gap-5">
          <div className="reveal rounded-frame border border-line p-7 lg:p-8">
            <h3 className="text-lg font-semibold text-moss">{t.basicTitle}</h3>
            <ul className="mt-5 space-y-3">
              {t.basic.map((i) => (
                <li key={i} className="flex gap-3 text-moss">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal rounded-frame border border-gold/50 bg-cream p-7 lg:p-8">
            <h3 className="font-serif text-2xl font-medium" style={serifSoft}>
              {t.oursTitle}
            </h3>
            <ul className="mt-5 space-y-3">
              {t.ours.map((i) => (
                <li key={i} className="flex gap-3">
                  <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cranberry text-paper">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

const featureMocks: Record<string, ReactNode> = {
  budzet: <BudgetMock />,
  etapy: <StagesMock />,
  razem: <TogetherMock />,
  rodzina: <WishlistMock />,
};

export function GiftFeatures() {
  const t = prezenty.features;
  return (
    <section id="jak-to-dziala" aria-labelledby="gift-features-title" className="bg-cream py-16 lg:py-24">
      <Container>
        <SectionTitle id="gift-features-title" text={t.title} />
        <ul className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-2 lg:mt-14 lg:gap-5">
          {t.items.map((item) => (
            <li key={item.id} className="reveal flex flex-col rounded-frame border border-line bg-paper p-6 lg:p-8">
              <div aria-hidden="true" className="flex min-h-[13rem] items-center justify-center rounded-panel bg-sand/60 p-5 sm:p-8">
                <div className="w-full max-w-sm">{featureMocks[item.id]}</div>
              </div>
              <h3 className="mt-6 font-serif text-2xl font-medium tracking-[-0.02em]" style={serifSoft}>
                {item.title}
              </h3>
              <p className="mt-2 leading-relaxed text-moss">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function GiftExtras() {
  const t = prezenty.extras;
  return (
    <section aria-labelledby="gift-extras-title" className="py-16 lg:py-24">
      <Container>
        <SectionTitle id="gift-extras-title" text={t.title} />
        <ul className="mx-auto mt-12 grid max-w-6xl gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {t.items.map((item) => {
            const Icon = featureIcons[item.icon];
            return (
              <li key={item.title} className="reveal">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream text-spruce shadow-[0_0_0_1px_var(--color-line)]">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-4 flex flex-wrap items-center gap-2 text-lg font-semibold leading-snug">
                  {item.title}
                  {"soon" in item && item.soon && (
                    <span className="rounded-full bg-sage px-2 py-0.5 text-[0.7rem] font-bold text-spruce">{t.soonLabel}</span>
                  )}
                </h3>
                <p className="mt-1.5 text-base text-moss">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

export function GiftSteps() {
  const t = prezenty.steps;
  return (
    <section aria-labelledby="gift-steps-title" className="border-t border-line py-16 lg:py-24">
      <Container>
        <SectionTitle id="gift-steps-title" text={t.title} />
        <ol className="mx-auto mt-12 grid max-w-5xl gap-10 md:grid-cols-3 md:gap-8 lg:mt-14">
          {t.items.map((step, i) => (
            <li key={step.title} className="reveal text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cream font-serif text-2xl text-cranberry shadow-[0_0_0_1px_var(--color-line)]" style={serifSoft}>
                {i + 1}
              </span>
              <h3 className="mt-5 font-serif text-2xl font-medium" style={serifSoft}>
                {step.title}
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-moss">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
