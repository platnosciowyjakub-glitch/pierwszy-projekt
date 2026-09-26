import type { Metadata } from "next";
import { prezenty } from "@/content/prezenty";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { GiftTool } from "@/components/prezenty/GiftTool";

export const metadata: Metadata = {
  title: prezenty.meta.title,
  description: prezenty.meta.description,
  alternates: { canonical: "/prezenty" },
  openGraph: { title: prezenty.meta.title, description: prezenty.meta.description, url: "/prezenty" },
};

// Zakładka „Przygotuj prezenty”: od razu samo narzędzie. Filmy o obsłudze są na stronie głównej.
export default function PrezentyPage() {
  return (
    <>
      <Header />
      <main>
        <GiftTool />
      </main>
      <Footer />
    </>
  );
}
