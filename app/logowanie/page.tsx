import type { Metadata } from "next";
import { konto } from "@/content/konto";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { LoginPanel } from "@/components/auth/LoginPanel";

export const metadata: Metadata = {
  title: "Zaloguj się | Gviazdka",
  description: konto.pageText,
  alternates: { canonical: "/logowanie" },
  robots: { index: false },
};

// Strona logowania: jedno duże pole na e-mail i jeden przycisk.
export default function LogowaniePage() {
  return (
    <>
      <Header />
      <main>
        <LoginPanel />
      </main>
      <Footer />
    </>
  );
}
