import { Fragment } from "react";

// Zamienia *słowa w gwiazdkach* z pliku z tekstami na wyróżnienie ozdobnym krojem.
export function Rich({ text }: { text: string }) {
  const parts = text.split(/\*(.+?)\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <em key={i} className="accent">
            {part}
          </em>
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
