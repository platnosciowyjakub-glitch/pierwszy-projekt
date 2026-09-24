// Złota gwiazdka: znak Gviazdki (logo, favicon, ozdoby).
export const STAR_PATH = "M12 2.6L14.53 9.12L21.51 9.51L16.09 13.93L17.88 20.69L12 16.9L6.12 20.69L7.91 13.93L2.49 9.51L9.47 9.12Z";

type Props = { className?: string; title?: string };

export function Star({ className, title }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <path d={STAR_PATH} fill="currentColor" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
