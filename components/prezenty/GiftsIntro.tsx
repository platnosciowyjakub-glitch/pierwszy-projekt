import { prezenty } from "@/content/prezenty";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Rich } from "@/components/ui/Rich";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { VideoFrame } from "@/components/ui/VideoFrame";

const t = prezenty.intro;

// Pierwszy ekran zakładki dla osób niezalogowanych: po lewej krótko, co to jest, po prawej film lub obrazek.
// Układ taki sam jak na stronie głównej.
export function GiftsIntro() {
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
          <div className="rise-in mt-8 lg:mt-10" style={{ "--delay": "240ms" } as React.CSSProperties}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <ButtonLink href="/logowanie?konto=nowe" className="min-h-[3.75rem] px-9 text-lg shadow-[0_10px_24px_-10px_rgb(168_68_58/0.55)]">
                {t.cta}
              </ButtonLink>
              <a href="/logowanie" className="flex min-h-11 items-center justify-center font-semibold text-spruce underline underline-offset-4 hover:text-cranberry">
                {t.login}
              </a>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
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
          <VideoFrame
            src={siteConfig.giftsVideo}
            poster={siteConfig.giftsVideoPoster}
            label={t.videoLabel}
            placeholder={t.videoPlaceholder}
            priority
          />
        </div>
      </Container>
    </section>
  );
}
