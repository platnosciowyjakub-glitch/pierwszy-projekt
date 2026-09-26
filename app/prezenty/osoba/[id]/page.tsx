import type { Metadata } from "next";
import { gifts } from "@/content/gifts";
import { PeopleScreen } from "@/components/gifts/People";

export const metadata: Metadata = { title: `${gifts.tabs.people} | Gviazdka`, robots: { index: false } };

export default async function OsobaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PeopleScreen personId={id} />;
}
