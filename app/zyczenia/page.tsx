import type { Metadata } from "next";
import { zyczenia } from "@/content/zyczenia";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { SoonFeature } from "@/components/features/SoonFeature";

export const metadata: Metadata = {
  title: zyczenia.meta.title,
  description: zyczenia.meta.description,
  alternates: { canonical: "/zyczenia" },
  openGraph: { title: zyczenia.meta.title, description: zyczenia.meta.description, url: "/zyczenia" },
};

// Niezalogowany widzi pierwszy ekran z filmem, zalogowany – przygotowane miejsce pracy.
export default function ZyczeniaPage() {
  return (
    <>
      <Header />
      <main>
        <SoonFeature intro={zyczenia.intro} workspace={zyczenia.workspace} video={siteConfig.videos.zyczenia} />
      </main>
      <Footer />
    </>
  );
}
