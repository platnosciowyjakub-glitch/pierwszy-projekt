import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";

export function Header() {
  return (
    <header className="relative z-10">
      <Container className="flex h-20 items-center">
        <a href="/" aria-label="Gviazdka – strona główna" className="rounded-lg">
          <Logo />
        </a>
      </Container>
    </header>
  );
}
