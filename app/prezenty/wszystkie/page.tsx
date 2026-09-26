import type { Metadata } from "next";
import { gifts } from "@/content/gifts";
import { AllGiftsView } from "@/components/gifts/Views";

export const metadata: Metadata = { title: `${gifts.tabs.all} | Gviazdka`, robots: { index: false } };

export default function Page() {
  return <AllGiftsView />;
}
