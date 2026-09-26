import type { Metadata } from "next";
import { plan } from "@/content/plan";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { SoonFeature } from "@/components/features/SoonFeature";

export const metadata: Metadata = {
  title: plan.meta.title,
  description: plan.meta.description,
  alternates: { canonical: "/plan" },
  openGraph: { title: plan.meta.title, description: plan.meta.description, url: "/plan" },
};

// Niezalogowany widzi pierwszy ekran z filmem, zalogowany – przygotowane miejsce pracy.
export default function PlanPage() {
  return (
    <>
      <Header />
      <main>
        <SoonFeature intro={plan.intro} workspace={plan.workspace} video={siteConfig.videos.plan} />
      </main>
      <Footer />
    </>
  );
}
