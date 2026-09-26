import { landing } from "@/content/landing";
import { primaryAction, siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Rich } from "@/components/ui/Rich";
import { SignupForm } from "@/components/landing/SignupForm";

// Zamknięcie: kremowe tło, duże zdjęcie z ciepłym światłem i formularz zapisu.
// Podstrony mogą podać własny nagłówek i tekst.
export function Closing({ title = landing.closing.title, text = landing.closing.text }: { title?: string; text?: string }) {
  const t = { ...landing.closing, title, text };
  const cta = primaryAction();
  return (
    <section id="zapis" aria-labelledby="closing-title" className="bg-cream py-16 lg:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Photo name="zapis" alt={t.photoAlt} sizes="(min-width: 1024px) 50vw, 100vw" className="reveal aspect-[4/3] lg:aspect-[5/4]" />
        <div className="reveal max-w-xl">
          <h2 id="closing-title" className="text-[2rem] leading-10 tracking-[-0.04em] lg:text-5xl lg:leading-[3.25rem]">
            <Rich text={t.title} />
          </h2>
          <p className="mt-4 text-lg text-moss">{siteConfig.launched ? t.launchedText : t.text}</p>
          <div className="mt-8">
            {siteConfig.launched ? (
              <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
            ) : (
              <SignupForm note={landing.signup.note} />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
