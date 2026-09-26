import { landing } from "@/content/landing";
import { primaryAction, siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Rich } from "@/components/ui/Rich";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { Star } from "@/components/illustrations/Star";

const t = landing.hero;

// Pierwszy ekran: po lewej jasno, czym jest Gviazdka i jeden przycisk; po prawej miejsce na film.
export function Hero() {
  const cta = primaryAction();
  return (
    <section aria-labelledby="hero-title">
      <Container className="grid items-center gap-10 pb-14 pt-8 sm:pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14 lg:pb-24 lg:pt-20">
        <div className="max-w-[36rem]">
          <h1
            id="hero-title"
            className="rise-in text-[2.5rem] font-bold leading-[1.1] tracking-[-0.035em] sm:text-[3.25rem] lg:text-[4.25rem] lg:leading-[1.05]"
          >
            <Rich text={t.title} variant="mark" />
          </h1>
          <p
            className="rise-in mt-6 text-lg leading-relaxed text-moss lg:mt-8 lg:text-[1.375rem] lg:leading-[1.55]"
            style={{ "--delay": "120ms" } as React.CSSProperties}
          >
            {t.subtitle}
          </p>
          <div
            className="rise-in mt-8 flex flex-col gap-5 sm:flex-row sm:items-center lg:mt-10"
            style={{ "--delay": "240ms" } as React.CSSProperties}
          >
            <ButtonLink href={cta.href} className="min-h-[3.75rem] px-9 text-lg">
              {cta.label}
            </ButtonLink>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 sm:flex-col sm:gap-y-1">
              {t.trust.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-sm font-medium text-moss">
                  <CheckIcon className="h-4 w-4 shrink-0 text-cranberry" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rise-in" style={{ "--delay": "360ms" } as React.CSSProperties}>
          <HeroVideo />
        </div>
      </Container>
    </section>
  );
}

// Pole na film. Gdy w config/site.ts wpiszesz heroVideo, pojawi się tu prawdziwy film.
function HeroVideo() {
  const frame = "relative aspect-[4/3] w-full overflow-hidden rounded-frame bg-spruce";
  if (siteConfig.heroVideo) {
    return (
      <div className={frame}>
        <video
          src={siteConfig.heroVideo}
          poster={siteConfig.heroVideoPoster || undefined}
          aria-label={t.videoLabel}
          controls
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }
  return (
    <div className={`${frame} on-dark flex flex-col items-center justify-center gap-4 text-snow`}>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgb(201_161_91/0.22),transparent_60%)]"
      />
      <span aria-hidden="true" className="relative flex h-16 w-16 items-center justify-center rounded-full border-[1.5px] border-snow/60">
        <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6">
          <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
        </svg>
      </span>
      <p className="relative flex items-center gap-2 text-sm text-snow/75">
        <Star className="h-3.5 w-3.5 text-gold" />
        {t.videoPlaceholder}
      </p>
    </div>
  );
}
