import type { Metadata } from "next";
import { goscie } from "@/content/goscie";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { SoonFeature } from "@/components/features/SoonFeature";

export const metadata: Metadata = {
  title: goscie.meta.title,
  description: goscie.meta.description,
  alternates: { canonical: "/goscie" },
  openGraph: { title: goscie.meta.title, description: goscie.meta.description, url: "/goscie" },
};

// Niezalogowany widzi pierwszy ekran z filmem, zalogowany – przygotowane miejsce pracy.
export default function GosciePage() {
  return (
    <>
      <Header />
      <main>
        <SoonFeature intro={goscie.intro} workspace={goscie.workspace} video={siteConfig.videos.goscie} />
      </main>
      <Footer />
    </>
  );
}
