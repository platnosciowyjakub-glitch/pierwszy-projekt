import type { ComponentProps } from "react";

// Przyciski-pigułki. Wciśnięcie daje natychmiastowe, lekkie „ugięcie”.
type Variant = "primary" | "outline" | "light" | "outlineLight" | "dark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold whitespace-nowrap " +
  "transition duration-200 ease-calm active:scale-[0.97] active:duration-75 disabled:cursor-wait disabled:opacity-80";

const variants: Record<Variant, string> = {
  primary: "bg-cranberry text-paper hover:bg-cranberry-deep",
  dark: "bg-spruce text-snow hover:bg-spruce-soft",
  outline: "border border-spruce text-spruce hover:bg-spruce hover:text-snow",
  light: "bg-sage text-spruce hover:bg-snow",
  outlineLight: "border border-snow/70 text-snow hover:bg-snow hover:text-spruce",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-14 px-7 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "lg", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; size?: Size };

export function Button({ variant = "primary", size = "lg", className = "", ...props }: ButtonProps) {
  return <button className={buttonClass(variant, size, className)} {...props} />;
}

type LinkProps = ComponentProps<"a"> & { variant?: Variant; size?: Size };

export function ButtonLink({ variant = "primary", size = "lg", className = "", ...props }: LinkProps) {
  return <a className={buttonClass(variant, size, className)} {...props} />;
}
