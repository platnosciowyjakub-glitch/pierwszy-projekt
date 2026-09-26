import type { Metadata } from "next";
import { gifts } from "@/content/gifts";
import { PeopleScreen } from "@/components/gifts/People";

export const metadata: Metadata = {
  title: gifts.meta.title,
  description: gifts.meta.description,
  alternates: { canonical: "/prezenty" },
  openGraph: { title: gifts.meta.title, description: gifts.meta.description, url: "/prezenty" },
};

// Zakładka „Osoby” (domyślna)
export default function PrezentyPage() {
  return <PeopleScreen />;
}
