import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type Props = {
  id?: string;
  tone?: "cream" | "sand";
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};

// Sekcja strony: tło (krem albo beż na zmianę) i wygodne odstępy.
export function Section({ id, tone = "cream", labelledBy, className = "", children }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${tone === "sand" ? "bg-sand" : "bg-cream"} py-20 sm:py-28 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

type HeadingProps = { id: string; eyebrow: string; title: string; text?: string; center?: boolean };

export function SectionHeading({ id, eyebrow, title, text, center = true }: HeadingProps) {
  return (
    <div className={`reveal max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="font-serif text-lg italic text-gold-text">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-[2rem] leading-[1.15] tracking-[-0.015em] sm:text-[2.75rem]">
        {title}
      </h2>
      {text && <p className="mt-5 text-lg text-moss">{text}</p>}
    </div>
  );
}
