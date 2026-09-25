import { siteConfig } from "@/config/site";
import { Star } from "@/components/illustrations/Star";

// Logo: nazwa w kroju nagłówkowym + złota gwiazdka. tone="dark" na ciemne tło.
export function Logo({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-serif text-[1.5rem] font-semibold sm:text-[1.625rem] tracking-[-0.02em] ${
        tone === "dark" ? "text-snow" : "text-spruce"
      } ${className}`}
      style={{ fontVariationSettings: '"SOFT" 50' }}
    >
      <Star className="h-[0.85em] w-[0.85em] -translate-y-[0.06em] text-gold" />
      {siteConfig.name}
    </span>
  );
}
