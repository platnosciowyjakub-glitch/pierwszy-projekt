import { landing } from "@/content/landing";
import { Section, SectionHeading } from "@/components/ui/Section";

const t = landing.faq;

export function Faq() {
  return (
    <Section id="pytania" tone="sand" labelledBy="faq-title">
      <SectionHeading id="faq-title" eyebrow={t.eyebrow} title={t.title} />
      <div className="mx-auto mt-12 max-w-2xl space-y-3">
        {t.items.map((item) => (
          <details key={item.q} className="reveal group rounded-soft bg-white/70 shadow-soft">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-soft px-6 py-5 text-lg font-bold [&::-webkit-details-marker]:hidden">
              {item.q}
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-cranberry transition-transform duration-300 ease-calm group-open:rotate-45"
              >
                <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </summary>
            <p className="px-6 pb-6 text-moss">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
