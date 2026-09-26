import { landing } from "@/content/landing";
import { primaryAction, siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Rich } from "@/components/ui/Rich";
import { CheckIcon } from "@/components/ui/CheckIcon";

const t = landing.hero;

// Pierwszy ekran: po lewej jasno, czym jest Gviazdka, i jeden przycisk; po prawej miejsce na film.
// Ciepło daje kremowe tło z poświatą jak od lampki i miękki, szeryfowy nagłówek.
export function Hero() {
  const cta = primaryAction();
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-cream">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_10%_0%,rgb(201_161_91/0.22),transparent_70%),radial-gradient(ellipse_50%_60%_at_95%_100%,rgb(168_68_58/0.08),transparent_70%)]"
      />
      <Container className="grid items-center gap-10 pb-14 pt-10 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:pb-24 lg:pt-20">
        <div className="max-w-[36rem]">
          <h1
            id="hero-title"
            className="rise-in font-serif text-[2.5rem] font-medium leading-[1.08] tracking-[-0.025em] sm:text-[3.25rem] lg:text-[4.25rem] lg:leading-[1.02] [&_.accent]:block [&_.accent]:font-normal [&_.accent]:italic [&_.accent]:text-cranberry"
            style={{ fontVariationSettings: '"SOFT" 100' }}
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
          <HeroVideo />
        </div>
      </Container>
    </section>
  );
}

// Pole na film. Gdy w config/site.ts wpiszesz heroVideo, pojawi się tu prawdziwy film.
function HeroVideo() {
  const frame =
    "relative aspect-[4/3] w-full overflow-hidden rounded-frame bg-sand ring-1 ring-gold/40 shadow-[0_30px_60px_-30px_rgb(31_58_46/0.35)]";
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
    <div className={frame}>
      <div className="absolute inset-0">
        <Photo name="zapis" alt="" sizes="(min-width: 1024px) 50vw, 100vw" priority className="h-full">
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(31_58_46/0.55),rgb(31_58_46/0.1)_60%)]" />
        </Photo>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-end gap-3 p-8 text-snow">
        <span aria-hidden="true" className="flex h-16 w-16 items-center justify-center rounded-full bg-paper/95 text-cranberry shadow-lg">
          <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6">
            <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
          </svg>
        </span>
        <p className="text-sm font-medium">{t.videoPlaceholder}</p>
      </div>
    </div>
  );
}
