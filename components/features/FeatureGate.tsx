"use client";

import type { ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { useSession } from "@/components/auth/useSession";
import { FeatureIntro, type IntroTexts } from "@/components/features/FeatureIntro";

// Wspólna zasada wszystkich zakładek: niezalogowany widzi pierwszy ekran z filmem,
// zalogowany – od razu narzędzie. Dopóki nie wiadomo, kto patrzy, zostaje spokojne kremowe tło.
export function FeatureGate({
  intro,
  video,
  children,
}: {
  intro: IntroTexts;
  video: { src: string; poster: string };
  children: (session: Session) => ReactNode;
}) {
  const { supabase, session, ready } = useSession();
  if (!supabase || (ready && !session)) return <FeatureIntro t={intro} video={video} />;
  if (!session) return <section aria-busy="true" className="min-h-[70vh] bg-cream" />;
  return <>{children(session)}</>;
}
