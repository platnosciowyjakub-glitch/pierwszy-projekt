import { landing } from "@/content/landing";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CalendarIllustration, GiftIllustration, HomeIllustration } from "@/components/illustrations/Illustrations";

const t = landing.problems;
const icons = { calendar: CalendarIllustration, gift: GiftIllustration, home: HomeIllustration };

export function Problems() {
  return (
    <Section tone="sand" labelledBy="problems-title">
      <SectionHeading id="problems-title" eyebrow={t.eyebrow} title={t.title} />
      <ul className="mt-14 grid gap-5 md:grid-cols-3">
        {t.items.map((item) => {
          const Icon = icons[item.icon];
          return (
            <li key={item.question} className="reveal">
              <Card className="h-full">
                <Icon className="h-16 w-16" />
                <h3 className="mt-5 text-2xl leading-snug">{item.question}</h3>
                <p className="mt-3 text-moss">{item.answer}</p>
              </Card>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
