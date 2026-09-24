// Ilustracje w jednej konwencji: cienka zielona kreska, miękka złota plama w tle,
// drobny akcent żurawiny. Rysunki są ozdobne, więc czytniki ekranu je pomijają.

type Props = { className?: string };

const line = {
  fill: "none",
  stroke: "var(--color-spruce)",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Blob({ cx = 34, cy = 36, r = 24 }: { cx?: number; cy?: number; r?: number }) {
  return <circle cx={cx} cy={cy} r={r} fill="var(--color-gold)" opacity="0.2" />;
}

export function GiftIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <Blob />
      <rect x="14" y="28" width="36" height="24" rx="3" {...line} />
      <rect x="11" y="21" width="42" height="8" rx="2.5" {...line} />
      <path d="M32 21v31" {...line} stroke="var(--color-cranberry)" />
      <path d="M32 21c-3-7-12-9-12-3.5 0 3.5 7 3.5 12 3.5zM32 21c3-7 12-9 12-3.5 0 3.5-7 3.5-12 3.5z" {...line} />
    </svg>
  );
}

export function HomeIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <Blob />
      <path d="M12 30L32 13l20 17" {...line} />
      <path d="M17 26v26h30V26" {...line} />
      <path d="M28 52V40h8v12" {...line} />
      <rect x="21" y="31" width="7" height="6" rx="1" fill="var(--color-gold)" opacity="0.7" />
      <path d="M44 9l1.2 2.6 2.8.3-2.1 1.9.6 2.8-2.5-1.4-2.5 1.4.6-2.8-2.1-1.9 2.8-.3z" fill="var(--color-cranberry)" />
    </svg>
  );
}

export function SuitcaseIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <Blob />
      <rect x="13" y="22" width="38" height="28" rx="4" {...line} />
      <path d="M25 22v-5a3 3 0 013-3h8a3 3 0 013 3v5" {...line} />
      <path d="M23 22v28M41 22v28" {...line} />
      <path d="M20 54h.01M44 54h.01" {...line} strokeWidth="3" />
      <path d="M28 34l3 3 6-6" {...line} stroke="var(--color-cranberry)" />
    </svg>
  );
}

export function MugIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <Blob cx={30} />
      <path d="M16 28h28v14a10 10 0 01-10 10h-8a10 10 0 01-10-10z" {...line} />
      <path d="M44 32h3a5 5 0 010 10h-3" {...line} />
      <path d="M24 12c-2 3 2 5 0 8M31 10c-2 3 2 5 0 8M38 12c-2 3 2 5 0 8" {...line} stroke="var(--color-gold)" />
      <path d="M26 38l4 3 4-3" {...line} stroke="var(--color-cranberry)" />
    </svg>
  );
}

export function CandleIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <circle cx="32" cy="16" r="12" fill="var(--color-gold)" opacity="0.25" className="glow" />
      <path d="M32 8c3 4 4 7 0 10-4-3-3-6 0-10z" fill="var(--color-gold)" />
      <path d="M32 18v4" {...line} />
      <rect x="25" y="22" width="14" height="30" rx="3" {...line} />
      <path d="M16 54h32" {...line} />
      <path d="M18 54c2-4 6-5 9-4M46 54c-2-4-6-5-9-4" {...line} stroke="var(--color-moss)" />
    </svg>
  );
}

export function BranchIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 120 40" aria-hidden="true" className={className}>
      <path d="M4 30C30 22 70 18 116 10" {...line} />
      {[16, 30, 44, 58, 72, 86, 100].map((x, i) => {
        const y = 30 - (x / 116) * 18;
        return (
          <g key={x}>
            <path d={`M${x} ${y}l${6} ${-9 + (i % 2)}`} {...line} strokeWidth="1.3" />
            <path d={`M${x} ${y}l${7} ${6 - (i % 2)}`} {...line} strokeWidth="1.3" />
          </g>
        );
      })}
      <circle cx="60" cy="26" r="3.2" fill="var(--color-cranberry)" />
      <circle cx="66" cy="28" r="2.6" fill="var(--color-cranberry)" opacity="0.85" />
    </svg>
  );
}
