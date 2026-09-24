import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";

export default function HomePage() {
  return (
    <>
      <div className="relative isolate">
        {/* Ciepłe światło, jak od lampy w rogu pokoju */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_85%_0%,rgb(243_227_195/0.75),transparent)]"
        />
        <Header />
        <main>
          <Hero />
        </main>
      </div>
    </>
  );
}
