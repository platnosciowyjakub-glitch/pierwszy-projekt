// Drobne, złote płatki, które bardzo powoli opadają w tle.
// Przy włączonym „ograniczeniu ruchu” w systemie w ogóle się nie pokazują (globals.css).

// Ile płatków ma padać. Więcej = gęstszy śnieg.
const FLAKE_COUNT = 22;

// Stały „los”, żeby płatki za każdym razem układały się tak samo (bez migania przy ładowaniu).
function seeded(n: number) {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const flakes = Array.from({ length: FLAKE_COUNT }, (_, i) => {
  const r = (k: number) => seeded(i * 7 + k);
  const depth = r(1); // 0 = daleko (małe, blade, wolne), 1 = blisko (większe, wyraźniejsze)
  return {
    left: ((i + r(2) * 0.8) / FLAKE_COUNT) * 100,
    size: 3 + depth * 4,
    duration: 38 - depth * 16,
    delay: -r(3) * 38,
    sway: (r(4) - 0.5) * 60,
    opacity: 0.3 + depth * 0.35,
    blur: depth > 0.8 ? 1 : 0,
  };
});

export function Snowfall() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {flakes.map((f, i) => (
        <span
          key={i}
          className="flake absolute top-0 rounded-full bg-gold"
          style={
            {
              left: `${f.left.toFixed(2)}%`,
              width: f.size.toFixed(1) + "px",
              height: f.size.toFixed(1) + "px",
              filter: f.blur ? "blur(1px)" : undefined,
              "--duration": `${f.duration.toFixed(1)}s`,
              "--delay": `${f.delay.toFixed(1)}s`,
              "--sway": `${f.sway.toFixed(0)}px`,
              "--flake-opacity": f.opacity.toFixed(2),
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
