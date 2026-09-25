import type { ReactNode } from "react";

// Szerokość treści jak u Zoli: pełna szerokość z marginesem 20 px (telefon) / 40 px (komputer).
// flush = bez bocznych marginesów (gdy sekcja sama rysuje linie od krawędzi).
export function Container({ children, className = "", flush = false }: { children: ReactNode; className?: string; flush?: boolean }) {
  return <div className={`mx-auto w-full max-w-[90rem] ${flush ? "" : "px-5 md:px-10"} ${className}`}>{children}</div>;
}
