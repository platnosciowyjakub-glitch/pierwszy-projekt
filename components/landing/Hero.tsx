import { landing } from "@/content/landing";
import { primaryAction, siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { Rich } from "@/components/ui/Rich";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { featureIcons } from "@/components/illustrations/FeatureIcons";

const t = landing.hero;

// Pierwszy ekran strony głównej. Inaczej niż w zakładkach: na środku obietnica i jeden przycisk,
// pod nimi szeroki film, a pod filmem „droga do Wigilii” – pięć przystanków prowadzących do zakładek.
export function Hero() {
  const cta = primaryAction();
  const j = t.journey;
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-cream"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_45%_at_50%_0%,rgb(201_161_91/0.25),transparent_70%),radial-gradient(ellipse_40%_40%_at_90%_85%,rgb(168_68_58/0.07),transparent_70%)]"
      />
      <Container className="pb-14 pt-12 sm:pt-16 lg:pb-20 lg:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            id="hero-title"
            className="rise-in font-serif text-[2.5rem] font-medium leading-[1.08] tracking-[-0.025em] sm:text-[3.5rem] lg:text-[4.5rem] lg:leading-[1.02] [&_.accent]:block [&_.accent]:font-normal [&_.accent]:italic [&_.accent]:text-cranberry"
            style={{ fontVariationSettings: '"SOFT" 100' }}
          >
            <Rich text={t.title} />
          </h1>
          <p
            className="rise-in mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-moss lg:mt-7 lg:text-[1.3125rem] lg:leading-[1.6]"
            style={{ "--delay": "120ms" } as React.CSSProperties}
          >
            {t.subtitle}
          </p>
          <div
            className="rise-in mt-8 lg:mt-10"
            style={{ "--delay": "240ms" } as React.CSSProperties}
          >
            <ButtonLink
              href={cta.href}
              className="min-h-[3.75rem] w-full px-10 text-lg shadow-[0_10px_24px_-10px_rgb(168_68_58/0.55)] sm:w-auto"
            >
              {cta.label}
            </ButtonLink>
            <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2">
              {t.trust.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-moss"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-paper text-gold-text shadow-[0_0_0_1px_var(--color-line)]"
                  >
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="rise-in mx-auto mt-12 max-w-6xl lg:mt-16"
          style={{ "--delay": "360ms" } as React.CSSProperties}
        >
          <VideoFrame
            src={siteConfig.heroVideo}
            poster={siteConfig.heroVideoPoster}
            label={t.videoLabel}
            placeholder={t.videoPlaceholder}
            priority
            wide
          />
        </div>

        <nav
          aria-label={j.label}
          className="rise-in mx-auto mt-10 max-w-5xl lg:mt-14"
          style={{ "--delay": "480ms" } as React.CSSProperties}
        >
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-gold-text">
            <span>{j.start}</span>
            <span className="flex items-center gap-1.5">
              {j.end}
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-3.5 w-3.5 text-gold"
              >
                <path
                  d="M12 3.5l2.4 5 5.4.6-4 3.7 1.1 5.4L12 15.5l-4.9 2.7 1.1-5.4-4-3.7 5.4-.6z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </div>
          <div className="scroll-row -mx-5 mt-3 overflow-x-auto px-5 md:mx-0 md:overflow-visible md:px-0">
            <div className="relative w-max md:w-full">
              <div
                aria-hidden="true"
                className="absolute inset-x-[3.5rem] top-7 h-px bg-[linear-gradient(to_right,var(--color-line),var(--color-gold),var(--color-line))] md:inset-x-[10%]"
              />
              <ol className="relative flex gap-1 md:grid md:grid-cols-5">
                {j.stops.map((stop) => {
                  const Icon = featureIcons[stop.icon];
                  return (
                    <li key={stop.href} className="relative w-28 md:w-auto">
                      <a
                        href={stop.href}
                        className="group flex flex-col items-center gap-3 rounded-panel px-1 pb-2 text-center"
                      >
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper text-spruce shadow-[0_0_0_1px_var(--color-line),0_8px_18px_-10px_rgb(31_58_46/0.35)] transition duration-300 ease-calm group-hover:-translate-y-0.5 group-hover:shadow-[0_0_0_1.5px_var(--color-cranberry),0_12px_22px_-10px_rgb(31_58_46/0.35)] group-active:scale-[0.96]">
                          <Icon className="h-7 w-7" />
                        </span>
                        <span className="text-sm font-semibold leading-snug underline-offset-4 group-hover:text-cranberry group-hover:underline">
                          {stop.label}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </nav>
      </Container>
    </section>
  );
}
