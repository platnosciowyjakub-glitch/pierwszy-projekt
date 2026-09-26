"use client";

import { FeatureGate } from "@/components/features/FeatureGate";
import { Workspace, type WorkspaceTexts } from "@/components/features/Workspace";
import type { IntroTexts } from "@/components/features/FeatureIntro";

// Zakładka, której narzędzie jeszcze powstaje: niezalogowany widzi pierwszy ekran z filmem,
// zalogowany – przygotowane miejsce pracy.
export function SoonFeature({ intro, workspace, video }: { intro: IntroTexts; workspace: WorkspaceTexts; video: { src: string; poster: string } }) {
  return (
    <FeatureGate intro={intro} video={video}>
      {() => <Workspace t={workspace} />}
    </FeatureGate>
  );
}
