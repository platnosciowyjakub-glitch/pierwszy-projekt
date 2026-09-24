import { siteConfig } from "@/config/site";
import { Star } from "@/components/illustrations/Star";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-serif text-2xl tracking-tight text-spruce ${className}`}>
      <Star className="h-[0.9em] w-[0.9em] -translate-y-[0.08em] text-gold" />
      {siteConfig.name}
    </span>
  );
}
