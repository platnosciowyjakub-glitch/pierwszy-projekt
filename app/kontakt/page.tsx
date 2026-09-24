import type { Metadata } from "next";
import { landing } from "@/content/landing";
import { siteConfig } from "@/config/site";
import { SoonPage } from "@/components/pages/SoonPage";

export const metadata: Metadata = {
  title: `${landing.footer.contact} – ${siteConfig.name}`,
  robots: { index: false },
};

export default function Page() {
  return <SoonPage title={landing.footer.contact} />;
}
