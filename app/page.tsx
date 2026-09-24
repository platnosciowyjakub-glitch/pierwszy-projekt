import { landing } from "@/content/landing";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Problems } from "@/components/landing/Problems";
import { Features } from "@/components/landing/Features";
import { Family } from "@/components/landing/Family";
import { Plans } from "@/components/landing/Plans";
import { Faq } from "@/components/landing/Faq";
import { Closing } from "@/components/landing/Closing";
import { Footer } from "@/components/landing/Footer";

// Pytania i odpowiedzi w formie, którą Google może pokazać bezpośrednio w wynikach
const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: landing.faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function HomePage() {
  return (
    <div className="relative isolate">
      {/* Ciepłe światło, jak od lampy w rogu pokoju */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[56rem] bg-[radial-gradient(ellipse_70%_55%_at_85%_0%,rgb(243_227_195/0.75),transparent)]"
      />
      <Header />
      <main>
        <Hero />
        <Problems />
        <Features />
        <Family />
        <Plans />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
    </div>
  );
}
