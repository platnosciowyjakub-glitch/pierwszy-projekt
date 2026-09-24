import { landing } from "@/content/landing";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { buttonClass } from "@/components/ui/Button";
import { SignupForm } from "@/components/landing/SignupForm";
import { PhonePreview } from "@/components/landing/PhonePreview";
import { Snowfall } from "@/components/landing/Snowfall";

const t = landing.hero;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <Snowfall />
      <Container className="grid items-center gap-16 pb-20 pt-10 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:pb-28 lg:pt-20">
        <div className="max-w-xl">
          <p className="rise-in font-serif text-lg italic text-gold-text">{t.eyebrow}</p>
          <h1
            id="hero-title"
            className="rise-in mt-4 text-[2.75rem] leading-[1.05] tracking-[-0.02em] sm:text-6xl lg:text-7xl"
            style={{ "--delay": "120ms" } as React.CSSProperties}
          >
            {t.title}
          </h1>
          <p
            className="rise-in mt-6 text-lg leading-relaxed text-moss sm:text-xl"
            style={{ "--delay": "240ms" } as React.CSSProperties}
          >
            {t.subtitle}
          </p>

          <div className="rise-in mt-10" style={{ "--delay": "360ms" } as React.CSSProperties}>
            {siteConfig.launched ? (
              <>
                <a href={siteConfig.appUrl} className={buttonClass}>
                  {t.launchedButton}
                </a>
                <p className="mt-4 text-sm text-moss">{t.launchedNote}</p>
              </>
            ) : (
              <SignupForm note={t.note} />
            )}
          </div>
        </div>

        <div className="rise-in" style={{ "--delay": "500ms" } as React.CSSProperties}>
          <PhonePreview />
        </div>
      </Container>
    </section>
  );
}
