import type { Metadata } from "next";
import { prezenty } from "@/content/prezenty";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { GiftsHero, GiftsInfo } from "@/components/prezenty/Sections";
import { GiftTool } from "@/components/prezenty/GiftTool";

export const metadata: Metadata = {
  title: prezenty.meta.title,
  description: prezenty.meta.description,
  alternates: { canonical: "/prezenty" },
  openGraph: { title: prezenty.meta.title, description: prezenty.meta.description, url: "/prezenty" },
};

// Podstrona „Przygotuj prezenty”: krótkie wyjaśnienie z filmem, sekcja o funkcjach,
// a pod nimi samo narzędzie (po zalogowaniu linkiem z e-maila).
export default function PrezentyPage() {
  return (
    <>
      <Header />
      <main>
        <GiftsHero />
        <GiftsInfo />
        <GiftTool />
      </main>
      <Footer />
    </>
  );
}
