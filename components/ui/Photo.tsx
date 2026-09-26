import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  name: string;
  alt: string;
  sizes: string;
  className?: string;
  rounded?: "frame" | "panel";
  priority?: boolean;
  zoom?: boolean;
  children?: ReactNode;
};

// Zdjęcie w zaokrąglonym kadrze. Dzieci (np. naklejka) nakładają się na zdjęcie.
export function Photo({ name, alt, sizes, className = "", rounded = "frame", priority, zoom, children }: Props) {
  return (
    <div
      className={`relative isolate overflow-hidden bg-sand ${rounded === "frame" ? "rounded-frame" : "rounded-panel"} ${className}`}
    >
      <Image
        src={`/zdjecia/${name}.jpg`}
        alt={alt}
        fill
        sizes={sizes}
        preload={priority}
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? "eager" : undefined}
        className={`object-cover ${zoom ? "transition-transform duration-700 ease-calm group-hover:scale-[1.04]" : ""}`}
      />
      {children}
    </div>
  );
}
