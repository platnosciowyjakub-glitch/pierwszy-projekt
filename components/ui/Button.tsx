import type { ComponentProps } from "react";

// Wspólny wygląd przycisków. Wciśnięcie daje natychmiastowe, lekkie „ugięcie”.
export const buttonClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-soft bg-cranberry px-6 py-3 " +
  "font-sans text-base font-bold text-cream shadow-soft transition duration-200 ease-calm " +
  "hover:bg-cranberry-deep active:scale-[0.98] active:duration-75 disabled:cursor-wait disabled:opacity-80";

export function Button({ className = "", ...props }: ComponentProps<"button">) {
  return <button className={`${buttonClass} ${className}`} {...props} />;
}
