import { landing } from "@/content/landing";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { GiftsScreen, PlanScreen, TasksScreen } from "@/components/landing/AppScreens";

const t = landing.features;
const screens = { plan: PlanScreen, prezenty: GiftsScreen, rodzina: TasksScreen };

export function Features() {
  return (
    <Section id="co-dostajesz" tone="sand" labelledBy="features-title">
      <SectionHeading id="features-title" eyebrow={t.eyebrow} title={t.title} />
      <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
        {t.items.map((item, i) => {
          const Screen = screens[item.id];
          return (
            <article
              key={item.id}
              id={item.id}
              aria-labelledby={`${item.id}-title`}
              className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
            >
              <div className={`reveal max-w-lg ${i % 2 ? "lg:order-2" : ""}`}>
                <p className="text-sm font-bold uppercase tracking-[0.08em] text-cranberry">{item.name}</p>
                <h3 id={`${item.id}-title`} className="mt-3 text-[1.75rem] leading-tight tracking-[-0.01em] sm:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-lg text-moss">{item.text}</p>
                <ul className="mt-6 space-y-3">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-text">
                        <CheckIcon className="h-4 w-4" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="reveal">
                <Screen />
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
