import { landing } from "@/content/landing";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Categories } from "@/components/landing/Categories";
import { FeatureStory } from "@/components/landing/FeatureStory";
import { Details } from "@/components/landing/Details";
import { Support } from "@/components/landing/Support";
import { Pricing } from "@/components/landing/Pricing";
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
    <>
      <Header />
      <main>
        <Hero />
        <Categories />
        <FeatureStory />
        <Details />
        <Support />
        <Pricing />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
    </>
  );
}
