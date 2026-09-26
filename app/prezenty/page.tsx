import type { Metadata } from "next";
import { prezenty } from "@/content/prezenty";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { GiftsHero, GiftsInfo } from "@/components/prezenty/Sections";

export const metadata: Metadata = {
  title: prezenty.meta.title,
  description: prezenty.meta.description,
  alternates: { canonical: "/prezenty" },
  openGraph: { title: prezenty.meta.title, description: prezenty.meta.description, url: "/prezenty" },
};

// Podstrona „Przygotuj prezenty”. Na razie widok dla osób niezalogowanych:
// krótkie wyjaśnienie z filmem i jedna sekcja o funkcjach. Pod nimi powstanie samo narzędzie.
export default function PrezentyPage() {
  return (
    <>
      <Header />
      <main>
        <GiftsHero />
        <GiftsInfo />
      </main>
      <Footer />
    </>
  );
}
