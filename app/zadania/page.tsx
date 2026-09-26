import type { Metadata } from "next";
import { zadania } from "@/content/zadania";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { SoonFeature } from "@/components/features/SoonFeature";

export const metadata: Metadata = {
  title: zadania.meta.title,
  description: zadania.meta.description,
  alternates: { canonical: "/zadania" },
  openGraph: { title: zadania.meta.title, description: zadania.meta.description, url: "/zadania" },
};

// Niezalogowany widzi pierwszy ekran z filmem, zalogowany – przygotowane miejsce pracy.
export default function ZadaniaPage() {
  return (
    <>
      <Header />
      <main>
        <SoonFeature intro={zadania.intro} workspace={zadania.workspace} video={siteConfig.videos.zadania} />
      </main>
      <Footer />
    </>
  );
}
