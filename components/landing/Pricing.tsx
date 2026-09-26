import { landing } from "@/content/landing";
import { pricing, priceSoon } from "@/config/pricing";
import { primaryAction } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Rich } from "@/components/ui/Rich";
import { CheckIcon } from "@/components/ui/CheckIcon";

const t = landing.pricingSection;

export function Pricing() {
  const cta = primaryAction();
  return (
    <section id="cennik" aria-labelledby="pricing-title" className="py-16 lg:py-24">
      <Container>
        <div className="reveal max-w-2xl">
          <h2 id="pricing-title" className="text-[2rem] leading-10 tracking-[-0.04em] lg:text-5xl lg:leading-[3.25rem]">
            <Rich text={t.title} />
          </h2>
          <p className="mt-4 text-lg text-moss">{t.subtitle}</p>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14 lg:gap-5">
          {pricing.map((plan) => (
            <li
              key={plan.id}
              className={`reveal flex flex-col rounded-frame border p-7 lg:p-8 ${
                plan.featured ? "border-spruce bg-sage" : "border-line bg-paper"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-2xl font-semibold tracking-[-0.02em]">{plan.name}</h3>
                {plan.featured && (
                  <span className="rounded-full bg-spruce px-3 py-1 text-xs font-bold text-snow">{t.featuredTag}</span>
                )}
              </div>
              <p className="mt-1 text-sm text-moss">{plan.for}</p>
              <p className="accent mt-6 text-3xl">{plan.price || priceSoon}</p>
              {plan.price && plan.note && <p className="text-sm text-moss">{plan.note}</p>}
              <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
                {plan.points.map((point) => (
                  <li key={point} className="flex gap-3 text-base">
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-cranberry" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <ButtonLink href={cta.href} variant={plan.featured ? "dark" : "outline"} className="mt-8 w-full">
                {t.button}
              </ButtonLink>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
