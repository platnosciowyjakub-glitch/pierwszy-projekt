import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { landing } from "@/content/landing";
import { STAR_PATH } from "@/components/illustrations/Star";

// Obrazek, który pojawia się przy udostępnianiu linku (Messenger, WhatsApp, Facebook).
export const alt = landing.meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [fraunces, nunito] = await Promise.all([
    readFile(join(process.cwd(), "assets/Fraunces-Medium.ttf")),
    readFile(join(process.cwd(), "assets/NunitoSans-SemiBold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "radial-gradient(circle at 85% 20%, #F3E3C3 0%, #FBF6EE 55%)",
          color: "#1F3A2E",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: "Fraunces", fontSize: 44 }}>
          <svg width="44" height="44" viewBox="0 0 24 24">
            <path d={STAR_PATH} fill="#C9A15B" stroke="#C9A15B" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          Gviazdka
        </div>
        <div style={{ marginTop: 56, fontFamily: "Fraunces", fontSize: 88, lineHeight: 1.05, letterSpacing: -2 }}>
          {landing.hero.title}
        </div>
        <div style={{ marginTop: 28, fontFamily: "Nunito Sans", fontSize: 32, color: "#5B6B61", maxWidth: 860 }}>
          {landing.hero.subtitle}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 500 },
        { name: "Nunito Sans", data: nunito, weight: 600 },
      ],
    },
  );
}
