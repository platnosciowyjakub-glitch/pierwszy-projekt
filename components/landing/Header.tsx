"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { landing } from "@/content/landing";
import { primaryAction, siteConfig } from "@/config/site";
import { resolveHref } from "@/lib/links";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";

const t = landing.nav;

export function Header() {
  const [open, setOpen] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDivElement>(null);
  const cta = primaryAction();
  const pathname = usePathname();

  // Escape zamyka panel i menu
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setOpen(null);
      if (menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Otwarte menu na telefonie: blokada przewijania strony i fokus w menu
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) drawer.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const show = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(i);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  };

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-md">
      <Container className="flex h-16 items-center gap-4 lg:h-[4.75rem] lg:gap-8">
        <a href="/" aria-label={`${siteConfig.name} – strona główna`} className="shrink-0 rounded-lg">
          <Logo />
        </a>

        {/* Kategorie z panelami (komputer) */}
        <nav aria-label="Funkcje" className="hidden h-full xl:block">
          <ul className="flex h-full items-center gap-1">
            {t.items.map((item, i) => (
              <li
                key={item.label}
                className="relative flex h-full items-center"
                onMouseEnter={() => show(i)}
                onMouseLeave={hide}
                onFocus={() => show(i)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(null);
                }}
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(null)}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`relative whitespace-nowrap rounded-full px-3.5 py-2 aria-[current=page]:bg-cream aria-[current=page]:font-semibold text-[0.9375rem] font-medium transition-colors duration-200 hover:bg-cream ${
                    open === i ? "bg-cream" : ""
                  }`}
                >
                  {item.label}
                </a>
                <div
                  className={`absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-2 transition duration-200 ease-calm ${
                    open === i ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                  }`}
                >
                  <div className="flex gap-4 rounded-panel border border-line bg-paper p-3 shadow-[0_12px_32px_-12px_rgb(31_58_46/0.18)]">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-sand">
                      <Image src={`/zdjecia/${item.photo}.jpg`} alt="" fill sizes="96px" className="object-cover" />
                    </div>
                    <div className="py-1">
                      <p className="text-sm leading-snug text-moss">{item.text}</p>
                      <a
                        href={item.href}
                        onClick={() => setOpen(null)}
                        className="mt-2 inline-block text-sm font-semibold text-cranberry underline-offset-4 hover:underline"
                      >
                        {t.panelLink}: {item.label} →
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3 lg:gap-5">
          <a href="/#cennik" className="hidden whitespace-nowrap text-[0.9375rem] font-medium underline-offset-4 hover:underline xl:inline">
            {t.pricing}
          </a>
          <ButtonLink href={cta.href} size="md" className="px-4 lg:px-5">
            {siteConfig.launched ? cta.label : t.signup}
          </ButtonLink>
          <button
            ref={menuButton}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="menu-mobilne"
            onClick={() => setMenuOpen(true)}
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full hover:bg-cream xl:hidden"
          >
            <span className="sr-only">{t.menu}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </Container>
    </header>

      {/* Pełnoekranowe menu na telefonie (poza nagłówkiem, bo rozmycie tła nagłówka „więziłoby” menu) */}
      <div
        id="menu-mobilne"
        ref={drawer}
        role="dialog"
        aria-modal="true"
        aria-label={t.menu}
        hidden={!menuOpen}
        className="fixed inset-0 z-50 h-dvh overflow-y-auto bg-paper xl:hidden"
      >
        <Container className="flex h-16 items-center justify-between border-b border-line">
          <Logo />
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              menuButton.current?.focus();
            }}
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full hover:bg-cream"
          >
            <span className="sr-only">{t.close}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </Container>
        <Container className="py-4">
          <ul>
            {t.items.map((item) => (
              <li key={item.label} className="border-b border-line">
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-4 py-4"
                >
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-sand">
                    <Image src={`/zdjecia/${item.photo}.jpg`} alt="" fill sizes="56px" className="object-cover" />
                  </span>
                  <span>
                    <span className="block text-lg font-semibold">{item.label}</span>
                    <span className="block text-sm leading-snug text-moss">{item.text}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <ul className="mt-4 space-y-1">
            {[{ label: t.pricing, href: "/#cennik" }, ...t.mobileExtra].map((l) => (
              <li key={l.label}>
                <a href={resolveHref(l.href)} onClick={() => setMenuOpen(false)} className="block py-2.5 text-lg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink href={cta.href} onClick={() => setMenuOpen(false)} className="mt-8 w-full">
            {cta.label}
          </ButtonLink>
        </Container>
      </div>
    </>
  );
}
