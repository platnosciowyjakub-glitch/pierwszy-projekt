// Kilka drobnych, złotych płatków, które bardzo powoli opadają w tle.
// Przy włączonym „ograniczeniu ruchu” w systemie w ogóle się nie pokazują (globals.css).

const flakes = [
  { left: 6, size: 5, duration: 26, delay: -3, sway: 18, opacity: 0.45 },
  { left: 17, size: 3, duration: 32, delay: -18, sway: -14, opacity: 0.35 },
  { left: 29, size: 4, duration: 28, delay: -9, sway: 22, opacity: 0.4 },
  { left: 41, size: 3, duration: 35, delay: -24, sway: -20, opacity: 0.3 },
  { left: 53, size: 5, duration: 30, delay: -14, sway: 16, opacity: 0.4 },
  { left: 64, size: 3, duration: 27, delay: -2, sway: -18, opacity: 0.35 },
  { left: 75, size: 4, duration: 33, delay: -20, sway: 20, opacity: 0.45 },
  { left: 86, size: 3, duration: 29, delay: -11, sway: -16, opacity: 0.3 },
  { left: 94, size: 5, duration: 36, delay: -27, sway: 14, opacity: 0.4 },
];

export function Snowfall() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {flakes.map((f, i) => (
        <span
          key={i}
          className="flake absolute top-0 rounded-full bg-gold"
          style={
            {
              left: `${f.left}%`,
              width: f.size,
              height: f.size,
              "--duration": `${f.duration}s`,
              "--delay": `${f.delay}s`,
              "--sway": `${f.sway}px`,
              "--flake-opacity": f.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
