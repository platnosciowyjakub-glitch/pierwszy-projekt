import { landing } from "@/content/landing";
import { Section } from "@/components/ui/Section";
import { MugIllustration, GiftIllustration } from "@/components/illustrations/Illustrations";

const t = landing.family;

// Kilka „osób” z inicjałami, jak na wspólnej liście
const people = [
  { initial: "A", tone: "bg-gold/30" },
  { initial: "K", tone: "bg-cranberry/15" },
  { initial: "M", tone: "bg-spruce/10" },
  { initial: "T", tone: "bg-sand-deep" },
];

export function Family() {
  return (
    <Section tone="sand" labelledBy="family-title">
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div className="reveal max-w-xl">
          <p className="font-serif text-lg italic text-gold-text">{t.eyebrow}</p>
          <h2 id="family-title" className="mt-3 text-[2rem] leading-[1.15] tracking-[-0.015em] sm:text-[2.75rem]">
            {t.title}
          </h2>
          <p className="mt-5 text-lg text-moss">{t.text}</p>
          <div aria-hidden="true" className="mt-8 flex -space-x-3">
            {people.map((p) => (
              <span
                key={p.initial}
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-sand font-serif text-lg ${p.tone}`}
              >
                {p.initial}
              </span>
            ))}
          </div>
        </div>
        <div className="reveal space-y-5">
          <div className="flex items-center gap-5 rounded-card bg-white/70 p-6 shadow-soft">
            <MugIllustration className="h-16 w-16 shrink-0" />
            <p className="text-moss">{t.linkText}</p>
          </div>
          <div className="flex items-center gap-5 rounded-card bg-white/70 p-6 shadow-soft">
            <GiftIllustration className="h-16 w-16 shrink-0" />
            <div>
              <p className="font-serif text-2xl">{t.privacyTitle}</p>
              <p className="mt-1 text-moss">{t.privacyText}</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
