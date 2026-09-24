import type { ReactNode } from "react";

// Obudowa telefonu do podglądów ekranów. To tylko ilustracja, nie prawdziwa aplikacja.
export function PhoneFrame({ label, children, glow = true }: { label: string; children: ReactNode; glow?: boolean }) {
  return (
    <figure className="relative mx-auto w-full max-w-[18rem]">
      {glow && (
        <div
          aria-hidden="true"
          className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(201_161_91/0.28),transparent)]"
        />
      )}
      <div className="rounded-phone border border-sand-deep bg-spruce p-2.5 shadow-lifted">
        <div className="min-h-[29rem] overflow-hidden rounded-[2rem] bg-cream px-5 pb-6 pt-4">
          <div aria-hidden="true" className="mx-auto mb-5 h-1.5 w-16 rounded-full bg-sand-deep" />
          {children}
        </div>
      </div>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
}
