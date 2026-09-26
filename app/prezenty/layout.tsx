import type { ReactNode } from "react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { GiftsShell } from "@/components/gifts/GiftsShell";

// Wspólna rama modułu „Prezenty i budżet”: dane wczytują się raz i zostają przy przechodzeniu między zakładkami.
export default function PrezentyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>
        <GiftsShell>{children}</GiftsShell>
      </main>
      <Footer />
    </>
  );
}
