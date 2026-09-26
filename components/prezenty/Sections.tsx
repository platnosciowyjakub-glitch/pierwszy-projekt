import { prezenty } from "@/content/prezenty";
import { primaryAction, siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Rich } from "@/components/ui/Rich";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { featureIcons } from "@/components/illustrations/FeatureIcons";

// Podstrona „Przygotuj prezenty” dla osób niezalogowanych: krótkie wyjaśnienie, film i jedna sekcja o funkcjach.

const serifSoft = { fontVariationSettings: '"SOFT" 100' } as const;

export function GiftsHero() {
  const t = prezenty.hero;
  const cta = primaryAction();
  return (
    <section aria-labelledby="gifts-title" className="relative isolate overflow-hidden bg-cream">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_10%_0%,rgb(201_161_91/0.22),transparent_70%),radial-gradient(ellipse_50%_60%_at_95%_100%,rgb(168_68_58/0.08),transparent_70%)]"
      />
      <Container className="grid items-center gap-10 pb-14 pt-10 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:pb-24 lg:pt-20">
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
          <VideoFrame src={siteConfig.giftsVideo} label={t.videoLabel} placeholder={t.videoPlaceholder} priority />
        </div>
      </Container>
    </section>
  );
}

export function GiftsInfo() {
  const t = prezenty.info;
  return (
    <section aria-labelledby="gifts-info-title" className="py-16 lg:py-24">
      <Container>
        <div className="reveal mx-auto max-w-3xl text-center">
          <h2 id="gifts-info-title" className="text-[2rem] leading-10 tracking-[-0.03em] lg:text-5xl lg:leading-[3.25rem]">
            <Rich text={t.title} />
          </h2>
          <p className="mt-4 text-lg text-moss">{t.subtitle}</p>
        </div>
        <ul className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
          {t.items.map((item) => {
            const Icon = featureIcons[item.icon];
            return (
              <li key={item.title} className="reveal flex gap-4 rounded-frame border border-line bg-cream/60 p-6 lg:p-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-paper text-spruce shadow-[0_0_0_1px_var(--color-line)]">
                  <Icon className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="font-serif text-xl font-medium tracking-[-0.01em]" style={serifSoft}>
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-base leading-relaxed text-moss">{item.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
