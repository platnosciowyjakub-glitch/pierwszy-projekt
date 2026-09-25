import { landing } from "@/content/landing";
import { Section, SectionHeading } from "@/components/ui/Section";
import {
  BellIllustration,
  CardIllustration,
  EnvelopeIllustration,
  PhoneIllustration,
  SparkleIllustration,
  SuitcaseIllustration,
} from "@/components/illustrations/Illustrations";

const t = landing.extras;
const icons = {
  suitcase: SuitcaseIllustration,
  envelope: EnvelopeIllustration,
  card: CardIllustration,
  sparkle: SparkleIllustration,
  bell: BellIllustration,
  phone: PhoneIllustration,
};

export function Extras() {
  return (
    <Section labelledBy="extras-title">
      <SectionHeading id="extras-title" eyebrow={t.eyebrow} title={t.title} />
      <ul className="mx-auto mt-14 grid max-w-5xl gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {t.items.map((item) => {
          const Icon = icons[item.icon];
          return (
            <li key={item.title} className="reveal flex gap-4">
              <Icon className="h-14 w-14 shrink-0" />
              <div>
                <h3 className="font-sans text-lg font-bold">{item.title}</h3>
                <p className="mt-1 text-base text-moss">{item.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
