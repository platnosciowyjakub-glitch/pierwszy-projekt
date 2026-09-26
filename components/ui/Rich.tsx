import { Fragment } from "react";

// Zamienia *słowa w gwiazdkach* z pliku z tekstami na wyróżnienie ozdobnym krojem.
// variant="mark" = podświetlenie jak markerem (pierwszy ekran).
export function Rich({ text, variant = "accent" }: { text: string; variant?: "accent" | "mark" }) {
  const parts = text.split(/\*(.+?)\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          variant === "mark" ? (
            <mark key={i} className="rounded-[0.18em] bg-sage px-[0.12em] text-spruce [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
              {part}
            </mark>
          ) : (
            <em key={i} className="accent">
              {part}
            </em>
          )
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function plain(text: string) {
  return text.replace(/\*/g, "");
}
