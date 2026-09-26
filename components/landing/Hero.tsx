import { landing } from "@/content/landing";
import { primaryAction } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Rich } from "@/components/ui/Rich";

const t = landing.hero;

// Pierwszy ekran. Komputer: zdjęcie na całą szerokość i tekst na środku (jak u Zoli).
// Telefon: zdjęcie w zaokrąglonym kadrze, pod nim tekst.
export function Hero() {
  const cta = primaryAction();
  return (
    <section aria-labelledby="hero-title" className="relative lg:h-[calc(100svh-4.75rem)] lg:max-h-[52rem] lg:min-h-[38rem]">
      <div className="px-5 pt-5 lg:absolute lg:inset-0 lg:p-0">
        <Photo
          name="hero"
          alt={t.photoAlt}
          priority
          sizes="(min-width: 1024px) 100vw, 92vw"
          rounded="panel"
          className="h-56 sm:h-80 lg:h-full lg:rounded-none"
        >
          <div aria-hidden="true" className="absolute inset-0 hidden bg-[radial-gradient(ellipse_at_center,rgb(20_36_28/0.62),rgb(20_36_28/0.38))] lg:block" />
        </Photo>
      </div>

      <div className="relative flex flex-col items-center px-5 pb-12 pt-8 text-center lg:absolute lg:inset-0 lg:justify-center lg:p-0 lg:text-snow">
        <h1
          id="hero-title"
          className="rise-in max-w-[20ch] font-serif text-[2rem] font-medium leading-[1.12] tracking-[-0.03em] sm:text-5xl lg:max-w-[18ch] lg:text-[4rem] lg:leading-[1.02] [&_.accent]:italic [&_.accent]:font-medium"
          style={{ fontVariationSettings: '"SOFT" 50' }}
        >
          <Rich text={t.title} />
        </h1>
        <p
          className="rise-in mt-4 max-w-[33rem] lg:max-w-[44rem] text-base leading-relaxed text-moss sm:text-lg lg:mt-6 lg:text-2xl lg:leading-8 lg:text-snow/90"
          style={{ "--delay": "150ms" } as React.CSSProperties}
        >
          {t.subtitle}
        </p>
        <div
          className="rise-in mt-7 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row lg:mt-10"
          style={{ "--delay": "300ms" } as React.CSSProperties}
        >
          <ButtonLink href={cta.href} className="w-full max-w-xs sm:w-auto">
            {cta.label}
          </ButtonLink>
          <a
            href="#plan"
            className="font-semibold underline decoration-1 underline-offset-4 lg:hidden"
          >
            {t.secondary}
          </a>
          <span className="hidden lg:block">
            <ButtonLink href="#plan" variant="outlineLight">
              {t.secondary}
            </ButtonLink>
          </span>
        </div>
      </div>
    </section>
  );
}
