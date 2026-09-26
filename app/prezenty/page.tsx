import type { Metadata } from "next";
import { prezenty } from "@/content/prezenty";
import { plain } from "@/components/ui/Rich";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Faq } from "@/components/landing/Faq";
import { Closing } from "@/components/landing/Closing";
import { Compare, GiftExtras, GiftFeatures, GiftSteps, GiftsHero } from "@/components/prezenty/Sections";

export const metadata: Metadata = {
  title: prezenty.meta.title,
  description: prezenty.meta.description,
  alternates: { canonical: "/prezenty" },
  openGraph: { title: prezenty.meta.title, description: prezenty.meta.description, url: "/prezenty" },
};

const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: prezenty.faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

// Podstrona „Przygotuj prezenty”
export default function PrezentyPage() {
  return (
    <>
      <Header />
      <main>
        <GiftsHero />
        <Compare />
        <GiftFeatures />
        <GiftExtras />
        <GiftSteps />
        <Faq title={prezenty.faq.title} items={prezenty.faq.items} />
        <Closing title={prezenty.closing.title} text={plain(prezenty.closing.text)} />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
    </>
  );
}
