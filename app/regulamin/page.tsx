import type { Metadata } from "next";
import { landing } from "@/content/landing";
import { siteConfig } from "@/config/site";
import { SoonPage } from "@/components/pages/SoonPage";

export const metadata: Metadata = {
  title: `${landing.footer.terms} – ${siteConfig.name}`,
  robots: { index: false },
};

export default function Page() {
  return <SoonPage title={landing.footer.terms} />;
}
