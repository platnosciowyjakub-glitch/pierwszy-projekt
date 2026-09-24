import { landing } from "@/content/landing";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Container } from "@/components/ui/Container";
import { CandleIllustration } from "@/components/illustrations/Illustrations";

// Prosta strona „Wkrótce” dla podstron, które jeszcze czekają na treść.
export function SoonPage({ title }: { title: string }) {
  const t = landing.soon;
  return (
    <>
      <Header />
      <main>
        <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
          <CandleIllustration className="h-20 w-20" />
          <h1 className="mt-6 text-4xl tracking-[-0.015em] sm:text-5xl">{title}</h1>
          <p className="mt-4 text-lg text-moss">
            {t.title}. {t.text}
          </p>
          <a href="/" className="mt-8 font-bold text-cranberry underline decoration-gold underline-offset-4">
            {t.back}
          </a>
        </Container>
      </main>
      <Footer />
    </>
  );
}
