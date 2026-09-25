import { landing } from "@/content/landing";
import { contactHref } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Rich } from "@/components/ui/Rich";

const t = landing.support;

// Ciemna sekcja wsparcia, układ jak „zespół” u Zoli: zdjęcie po lewej, tekst po prawej.
export function Support() {
  return (
    <section aria-labelledby="support-title" className="on-dark bg-spruce text-snow">
      <Container flush className="grid lg:grid-cols-[1.35fr_1fr]">
        <div className="px-5 pt-14 md:px-10 lg:border-r lg:border-snow/15 lg:p-5">
          <Photo name="wsparcie" alt={t.photoAlt} sizes="(min-width: 1024px) 55vw, 100vw" rounded="panel" className="aspect-[4/3] lg:aspect-[824/730]">
            <div aria-hidden="true" className="absolute inset-x-4 bottom-4 flex flex-col gap-2 sm:inset-x-8 sm:bottom-8">
              <span className="max-w-[16rem] self-start rounded-2xl rounded-bl-md border-[1.5px] border-spruce bg-paper px-4 py-2.5 text-sm font-medium text-spruce">
                {t.bubbles[0]}
              </span>
              <span className="max-w-[18rem] self-end rounded-2xl rounded-br-md border-[1.5px] border-spruce bg-sage px-4 py-2.5 text-sm font-medium text-spruce">
                {t.bubbles[1]}
              </span>
            </div>
          </Photo>
        </div>
        <div className="flex flex-col justify-between gap-10 px-5 py-14 md:px-10 lg:py-16 lg:pl-16">
          <h2 id="support-title" className="text-[2rem] leading-10 tracking-[-0.04em] lg:max-w-[22rem] [&_.accent]:text-gold">
            <Rich text={t.title} />
          </h2>
          <div>
            <p className="max-w-sm text-xl leading-8 text-snow/85">{t.text}</p>
            <ButtonLink href={contactHref()} variant="light" className="mt-6">
              {t.button}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
