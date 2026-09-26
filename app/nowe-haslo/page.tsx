import type { Metadata } from "next";
import { konto } from "@/content/konto";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { NewPasswordPanel } from "@/components/auth/NewPasswordPanel";

export const metadata: Metadata = {
  title: "Nowe hasło | Gviazdka",
  description: konto.newPasswordText,
  robots: { index: false },
};

// Tu prowadzi link z maila „Nie pamiętasz hasła?”.
export default function NoweHasloPage() {
  return (
    <>
      <Header />
      <main>
        <NewPasswordPanel />
      </main>
      <Footer />
    </>
  );
}
