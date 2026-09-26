import { landing } from "@/content/landing";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Container } from "@/components/ui/Container";
import { Star } from "@/components/illustrations/Star";

// Prosta strona „Wkrótce” dla podstron, które jeszcze czekają na treść.
export function SoonPage({ title }: { title: string }) {
  const t = landing.soon;
  return (
    <>
      <Header />
      <main>
        <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
          <Star className="h-10 w-10 text-gold" />
          <h1 className="mt-6 font-serif text-4xl font-medium tracking-[-0.03em] sm:text-5xl">{title}</h1>
          <p className="mt-4 text-lg text-moss">
            {t.title}. {t.text}
          </p>
          <a href="/" className="mt-8 font-semibold text-cranberry underline underline-offset-4">
            {t.back}
          </a>
        </Container>
      </main>
      <Footer />
    </>
  );
}
