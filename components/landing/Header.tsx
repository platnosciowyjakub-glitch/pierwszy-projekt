import { landing } from "@/content/landing";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";

export function Header() {
  return (
    <header className="relative z-10">
      <Container className="flex h-20 items-center justify-between">
        <a href="/" aria-label={`${siteConfig.name} – strona główna`} className="rounded-lg">
          <Logo />
        </a>
        {!siteConfig.launched && (
          <a
            href="#zapisy"
            className="rounded-full border border-sand-deep bg-white/60 px-4 py-2 text-sm font-bold text-spruce transition duration-200 ease-calm hover:bg-white active:scale-[0.97]"
          >
            {landing.nav.signup}
          </a>
        )}
      </Container>
    </header>
  );
}
