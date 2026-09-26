import { ImageResponse } from "next/og";
import { STAR_PATH } from "@/components/illustrations/Star";

// Ikona na ekranie głównym telefonu (iPhone).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1F3A2E" }}>
        <svg width="112" height="112" viewBox="0 0 24 24">
          <path d={STAR_PATH} fill="#C9A15B" stroke="#C9A15B" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    size,
  );
}
