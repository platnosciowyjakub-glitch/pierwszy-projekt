import { landing } from "@/content/landing";
import { Container } from "@/components/ui/Container";
import { Rich } from "@/components/ui/Rich";
import { featureIcons } from "@/components/illustrations/FeatureIcons";
import { CheckIcon } from "@/components/ui/CheckIcon";

const t = landing.categories;

// Sześć funkcji w przejrzystych kartach: ikona, nazwa-polecenie, dwa zdania i przykład z aplikacji.
export function Categories() {
  return (
    <section aria-labelledby="categories-title" className="py-16 lg:py-24">
      <Container>
        <div className="reveal mx-auto max-w-3xl text-center">
          <h2 id="categories-title" className="text-[2rem] leading-10 tracking-[-0.03em] lg:text-5xl lg:leading-[3.25rem]">
            <Rich text={t.title} />
          </h2>
          <p className="mt-4 text-lg text-moss">{t.subtitle}</p>
        </div>

        <ul className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
          {t.items.map((item) => {
            const Icon = featureIcons[item.icon];
            return (
              <li key={item.title} className="reveal">
                <a
                  href={item.href}
                  className="group flex h-full flex-col rounded-frame border border-line bg-cream/60 p-6 transition duration-300 ease-calm hover:-translate-y-0.5 hover:border-gold/60 hover:bg-cream lg:p-8"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-paper text-spruce shadow-[0_0_0_1px_var(--color-line)]">
                    <Icon className="h-9 w-9" />
                  </span>
                  <h3 className="mt-5 font-serif text-2xl font-medium tracking-[-0.02em]" style={{ fontVariationSettings: '"SOFT" 100' }}>
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-base leading-relaxed text-moss">{item.text}</p>
                  <p className="mt-5 inline-flex items-center gap-2 self-start rounded-full bg-paper py-1.5 pl-2 pr-4 text-sm font-medium shadow-[0_0_0_1px_var(--color-line)]">
                    <span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cranberry text-paper">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    {item.example}
                  </p>
                  <span className="mt-4 text-sm font-semibold text-cranberry">
                    {t.more}{" "}
                    <span aria-hidden="true" className="inline-block transition-transform duration-300 ease-calm group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
