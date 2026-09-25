import { landing } from "@/content/landing";
import { Section, SectionHeading } from "@/components/ui/Section";

const t = landing.steps;

export function Steps() {
  return (
    <Section id="jak-to-dziala" labelledBy="steps-title">
      <SectionHeading id="steps-title" eyebrow={t.eyebrow} title={t.title} />
      <ol className="mx-auto mt-14 grid max-w-5xl gap-10 md:grid-cols-3 md:gap-8">
        {t.items.map((step, i) => (
          <li key={step.title} className="reveal text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sand font-serif text-2xl text-gold-text shadow-soft">
              {i + 1}
            </span>
            <h3 className="mt-5 text-2xl leading-snug">{step.title}</h3>
            <p className="mx-auto mt-3 max-w-xs text-moss">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
