import type { Metadata } from "next";
import { gifts } from "@/content/gifts";
import { SoonView } from "@/components/gifts/Views";

export const metadata: Metadata = { title: `${gifts.tabs.wishlist} | Gviazdka`, robots: { index: false } };

export default function Page() {
  return <SoonView part="wishlist" />;
}
