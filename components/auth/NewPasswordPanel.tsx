"use client";

import { useId, useState, type FormEvent } from "react";
import { konto } from "@/content/konto";
import { Container } from "@/components/ui/Container";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Rich } from "@/components/ui/Rich";
import { useSession } from "@/components/auth/useSession";

const MIN_PASSWORD = 8;

export function NewPasswordPanel() {
  const id = useId();
  const { supabase, session, ready } = useSession();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password.length < MIN_PASSWORD) return setError(konto.passwordShort);
    setError("");
    setBusy(true);
    const { error } = await supabase!.auth.updateUser({ password });
    setBusy(false);
    if (error) return setError(error.code === "weak_password" ? konto.weakPassword : konto.genericError);
    setDone(true);
  }

  return (
    <section aria-labelledby="new-password-title" className="relative isolate overflow-hidden bg-cream py-14 lg:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_10%_0%,rgb(201_161_91/0.22),transparent_70%)]"
      />
      <Container className="max-w-xl">
        <h1
          id="new-password-title"
          className="text-center font-serif text-[2.25rem] font-medium leading-[1.1] tracking-[-0.025em] sm:text-5xl [&_.accent]:italic [&_.accent]:text-cranberry"
          style={{ fontVariationSettings: '"SOFT" 100' }}
        >
          <Rich text={konto.newPasswordTitle} />
        </h1>
        <p className="mt-4 text-center text-lg leading-relaxed text-moss">{konto.newPasswordText}</p>

        <div className="mt-8 rounded-frame border border-line bg-paper p-6 shadow-soft sm:p-8">
          {!supabase ? (
            <p className="text-center text-moss">{konto.unavailable}</p>
          ) : !ready ? (
            <p className="text-center text-moss">{konto.loading}</p>
          ) : done ? (
            <div role="status" className="text-center">
              <p className="font-serif text-2xl font-medium">{konto.newPasswordDone}</p>
              <ButtonLink href="/prezenty" className="mt-6 w-full">
                {konto.goToGifts}
              </ButtonLink>
            </div>
          ) : !session ? (
            <div className="text-center">
              <p className="text-moss">{konto.newPasswordExpired}</p>
              <ButtonLink href="/logowanie?konto=haslo" className="mt-6 w-full">
                {konto.newPasswordAgain}
              </ButtonLink>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <label htmlFor={`${id}-password`} className="block text-lg font-semibold">
                {konto.newPasswordLabel}
              </label>
              <div className="relative">
                <input
                  id={`${id}-password`}
                  type={show ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-describedby={`${id}-hint`}
                  className="mt-2 min-h-14 w-full rounded-soft border-2 border-line bg-paper px-5 pr-24 text-lg text-spruce focus:border-spruce focus:outline-none"
                />
                <button
                  type="button"
                  aria-pressed={show}
                  aria-label={konto.showPasswordLabel}
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-2 top-1/2 mt-1 min-h-11 -translate-y-1/2 rounded-full px-4 text-sm font-semibold text-moss hover:bg-cream"
                >
                  {show ? konto.hidePassword : konto.showPassword}
                </button>
              </div>
              <p id={`${id}-hint`} className="mt-2 text-sm text-moss">
                {konto.passwordHint}
              </p>
              {error && (
                <p role="alert" className="mt-3 text-cranberry">
                  {error}
                </p>
              )}
              <Button type="submit" disabled={busy} className="mt-6 w-full">
                {busy ? konto.wait : konto.newPasswordButton}
              </Button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
