"use client";

import { konto } from "@/content/konto";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Rich } from "@/components/ui/Rich";
import { AuthForm } from "@/components/auth/AuthForm";
import { useSession } from "@/components/auth/useSession";

export function LoginPanel() {
  const { supabase, session, ready } = useSession();

  return (
    <section aria-labelledby="login-title" className="relative isolate overflow-hidden bg-cream py-14 lg:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_10%_0%,rgb(201_161_91/0.22),transparent_70%)]"
      />
      <Container className="max-w-xl">
        <h1
          id="login-title"
          className="text-center font-serif text-[2.25rem] font-medium leading-[1.1] tracking-[-0.025em] sm:text-5xl [&_.accent]:italic [&_.accent]:text-cranberry"
          style={{ fontVariationSettings: '"SOFT" 100' }}
        >
          <Rich text={konto.pageTitle} />
        </h1>
        <p className="mt-4 text-center text-lg leading-relaxed text-moss">{konto.pageText}</p>

        <div className="mt-8 rounded-frame border border-line bg-paper p-6 shadow-soft sm:p-8">
          {!supabase ? (
            <p className="text-center text-moss">{konto.unavailable}</p>
          ) : !ready ? (
            <p className="text-center text-moss">{konto.loading}</p>
          ) : session ? (
            <div className="text-center">
              <p className="font-serif text-2xl font-medium">{konto.loggedInTitle}</p>
              <p className="mt-2 text-moss">{konto.loggedInText.replace("{email}", session.user.email ?? "")}</p>
              <ButtonLink href="/prezenty#lista" className="mt-6 w-full">
                {konto.goToGifts}
              </ButtonLink>
              <button
                type="button"
                onClick={() => supabase.auth.signOut()}
                className="mt-3 min-h-11 font-semibold text-moss underline-offset-4 hover:underline"
              >
                {konto.logout}
              </button>
            </div>
          ) : (
            <AuthForm />
          )}
        </div>
        <p className="mt-6 text-center text-sm text-moss">{konto.note}</p>
      </Container>
    </section>
  );
}
