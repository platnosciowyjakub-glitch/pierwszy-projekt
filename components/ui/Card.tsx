import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-card bg-white/70 p-7 shadow-soft sm:p-8 ${className}`}>{children}</div>;
}
