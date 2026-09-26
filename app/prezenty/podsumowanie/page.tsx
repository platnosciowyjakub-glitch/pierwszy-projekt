import type { Metadata } from "next";
import { gifts } from "@/content/gifts";
import { SummaryView } from "@/components/gifts/Views";

export const metadata: Metadata = { title: `${gifts.tabs.summary} | Gviazdka`, robots: { index: false } };

export default function Page() {
  return <SummaryView />;
}
