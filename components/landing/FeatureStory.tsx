"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { landing } from "@/content/landing";
import { contactHref, primaryAction } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Rich } from "@/components/ui/Rich";
import { WelcomePreview } from "@/components/mockups/WelcomePreview";
import { FamilyMock, GiftsMock, GuestsMock, InvitationMock, PackingMock } from "@/components/mockups/Mockups";

const t = landing.features;

// Nakładki na zdjęcia: makiety ekranów aplikacji
const overlays: Record<string, ReactNode> = {
  plan: <WelcomePreview className="absolute bottom-4 right-4 w-[15rem] lg:bottom-6 lg:right-6" />,
  prezenty: <GiftsMock className="absolute inset-x-4 bottom-4 lg:inset-x-6 lg:bottom-6" />,
  rodzina: (
    <>
      <PackingMock className="absolute right-4 top-4 w-[10.5rem] lg:right-6 lg:top-6" />
      <FamilyMock className="absolute inset-x-4 bottom-4 lg:inset-x-6 lg:bottom-6" />
    </>
  ),
  wigilia: (
    <>
      <InvitationMock className="absolute left-4 top-4 w-[15rem] lg:left-6 lg:top-6" />
      <GuestsMock className="absolute bottom-4 right-4 w-[14rem] lg:bottom-6 lg:right-6" />
    </>
  ),
};

// Cztery funkcje w ciemnym pasie. Na komputerze obok przyklejony spis, który śledzi przewijanie.
export function FeatureStory() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const cta = primaryAction();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(refs.current.indexOf(e.target as HTMLElement));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="lg:border-b lg:border-line">
      <Container flush className="lg:grid lg:grid-cols-[1fr_15rem]">
        <div className="on-dark bg-spruce text-snow">
          {t.items.map((item, i) => (
            <article
              key={item.id}
              id={item.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              aria-labelledby={`${item.id}-title`}
              className="grid gap-10 px-5 py-16 md:px-10 lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:items-center lg:gap-10 lg:py-24 xl:gap-14"
            >
              <div className="reveal lg:order-2">
                <p className="text-sm text-snow/75 lg:hidden">{item.label}</p>
                <h2
                  id={`${item.id}-title`}
                  className="mt-2 text-[2rem] font-normal leading-[1.3] tracking-[-0.04em] lg:mt-0 lg:text-[4rem] lg:leading-none [&_.accent]:text-gold"
                >
                  <Rich text={item.title} />
                </h2>
                <p className="mt-5 max-w-[32rem] text-lg leading-relaxed text-snow/85 lg:mt-8 lg:text-2xl lg:leading-[2.125rem]">
                  {item.text}
                </p>
                <div className="mt-8 flex flex-wrap gap-3 lg:mt-10">
                  <ButtonLink href={cta.href} variant="light">
                    {cta.label}
                  </ButtonLink>
                  <ButtonLink href={item.secondary.href} variant="outlineLight">
                    {item.secondary.label}
                  </ButtonLink>
                </div>
              </div>
              <div className="reveal relative">
                <Photo
                  name={item.photo}
                  alt={item.alt}
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="aspect-[4/5] lg:aspect-[480/625]"
                >
                  {overlays[item.id]}
                </Photo>
              </div>
            </article>
          ))}
        </div>

        {/* Przyklejony spis funkcji (komputer) */}
        <aside className="hidden lg:block">
          <div className="sticky top-[4.75rem] flex h-[calc(100svh-4.75rem)] flex-col justify-between px-5 py-16">
            <nav aria-label="Spis funkcji">
              <ul>
                {t.items.map((item, i) => (
                  <li key={item.id} className="border-b border-line">
                    <a
                      href={`#${item.id}`}
                      aria-current={active === i ? "true" : undefined}
                      className={`block py-8 transition-colors duration-300 ${
                        active === i ? "font-semibold text-spruce" : "text-moss hover:text-spruce"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="accent text-lg">{t.helpTitle}</p>
              <a href={contactHref()} className="mt-1 inline-block font-semibold underline underline-offset-4">
                {t.helpLink}
              </a>
            </div>
          </div>
        </aside>
      </Container>
    </div>
  );
}
