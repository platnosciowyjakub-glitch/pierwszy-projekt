import { landing } from "@/content/landing";
import { Container } from "@/components/ui/Container";
import { Photo, Sticker } from "@/components/ui/Photo";
import { Rich } from "@/components/ui/Rich";

const t = landing.categories;

// Sześć kafelków: na komputerze tytuł po lewej i siatka 3 × 2 z liniami,
// na telefonie poziomo przewijany rząd.
export function Categories() {
  return (
    <section aria-labelledby="categories-title" className="border-y border-line">
      <Container flush>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(16rem,1fr)_3fr]">
          <div className="px-5 pb-6 pt-12 md:px-10 lg:flex lg:flex-col lg:justify-center lg:border-r lg:border-line lg:py-16">
            <h2 id="categories-title" className="text-2xl leading-8 tracking-[-0.03em] lg:text-[2rem] lg:leading-10">
              <Rich text={t.title} />
            </h2>
            <p className="mt-3 text-moss lg:mt-6 lg:text-xl">{t.subtitle}</p>
          </div>

          <ul className="scroll-row relative flex min-w-0 snap-x snap-mandatory scroll-px-5 md:scroll-px-10 gap-4 overflow-x-auto px-5 pb-12 md:px-10 lg:grid lg:grid-cols-3 lg:gap-0 lg:overflow-visible lg:p-0">
            {t.items.map((item, i) => (
              <li
                key={item.title}
                className={`w-[15rem] shrink-0 snap-start lg:w-auto lg:border-line ${i < 3 ? "lg:border-b" : ""} ${
                  i % 3 !== 2 ? "lg:border-r" : ""
                }`}
              >
                <a href={item.href} className="group block h-full lg:p-10">
                  <h3 className="text-lg font-semibold leading-snug lg:text-2xl lg:font-normal lg:tracking-[-0.02em]">
                    {item.title}{" "}
                    <span aria-hidden="true" className="inline-block transition-transform duration-300 ease-calm group-hover:translate-x-1">
                      →
                    </span>
                  </h3>
                  <p className="mt-1 text-sm text-moss">{item.text}</p>
                  <Photo
                    name={item.photo}
                    alt={item.alt}
                    sizes="(min-width: 1024px) 22vw, 240px"
                    zoom
                    className="mt-4 aspect-[7/6] lg:mt-6"
                  >
                    <Sticker className="bottom-3 left-3">{item.sticker}</Sticker>
                  </Photo>
                  <span className="sr-only">{t.more}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
