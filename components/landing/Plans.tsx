import { landing } from "@/content/landing";
import { siteConfig } from "@/config/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/CheckIcon";

const t = landing.plans;

export function Plans() {
  return (
    <Section id="pakiety" labelledBy="plans-title">
      <SectionHeading id="plans-title" eyebrow={t.eyebrow} title={t.title} />
      <ul className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
        {t.items.map((plan) => {
          const price = siteConfig.prices[plan.id];
          const featured = plan.id === "rodzinny";
          return (
            <li
              key={plan.id}
              className={`reveal flex flex-col rounded-card p-7 shadow-soft sm:p-8 ${
                featured ? "bg-spruce text-cream" : "bg-white/70"
              }`}
            >
              <h3 className="text-2xl">{plan.name}</h3>
              <p className={`mt-1 text-sm ${featured ? "text-cream/75" : "text-moss"}`}>{plan.for}</p>
              <p className="mt-6 font-serif text-3xl">{price || t.priceSoon}</p>
              {price && siteConfig.priceNote && (
                <p className={`text-sm ${featured ? "text-cream/75" : "text-moss"}`}>{siteConfig.priceNote}</p>
              )}
              <ul className={`mt-6 space-y-3 border-t pt-6 ${featured ? "border-cream/15" : "border-sand-deep"}`}>
                {plan.points.map((point) => (
                  <li key={point} className="flex gap-3 text-base">
                    <CheckIcon className={`mt-1 h-4 w-4 shrink-0 ${featured ? "text-gold" : "text-cranberry"}`} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
