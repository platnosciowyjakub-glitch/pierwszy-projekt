"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import type { AuthError } from "@supabase/supabase-js";
import { konto } from "@/content/konto";
import { getSupabase } from "@/lib/supabase";
import { isValidEmail } from "@/lib/email";
import { Button } from "@/components/ui/Button";

// Logowanie i zakładanie konta e-mailem i hasłem. Nowe konto trzeba potwierdzić linkiem z maila.
// Tryb można otworzyć od razu z adresu: /logowanie?konto=nowe (zakładanie) albo ?konto=haslo (nowe hasło).

export type AuthMode = "login" | "signup" | "reset";

const MIN_PASSWORD = 8;
const inputClass =
  "mt-2 min-h-14 w-full rounded-soft border-2 border-line bg-paper px-5 text-lg text-spruce placeholder:text-moss/70 focus:border-spruce focus:outline-none";

function errorText(error: AuthError) {
  const code = error.code ?? "";
  const message = error.message.toLowerCase();
  if (code === "invalid_credentials" || message.includes("invalid login")) return konto.wrongCredentials;
  if (code === "email_not_confirmed" || message.includes("not confirmed")) return konto.notConfirmed;
  if (code === "weak_password") return konto.weakPassword;
  if (code === "user_already_exists") return konto.alreadyExists;
  if (code === "over_email_send_rate_limit" || message.includes("email rate limit")) return konto.tooManyEmails;
  if (code.startsWith("over_") || error.status === 429) return konto.tooMany;
  return konto.genericError;
}

export function AuthForm({ returnTo = "/prezenty#lista", initialEmail = "" }: { returnTo?: string; initialEmail?: string }) {
  const id = useId();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState<"signup" | "reset" | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("konto");
    if (wanted === "nowe") setMode("signup");
    if (wanted === "haslo") setMode("reset");
  }, []);

  function switchMode(next: AuthMode) {
    setMode(next);
    setError("");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const address = email.trim();
    if (!isValidEmail(address)) return setError(konto.emailInvalid);
    if (mode === "login" && !password) return setError(konto.passwordMissing);
    if (mode === "signup" && password.length < MIN_PASSWORD) return setError(konto.passwordShort);

    setError("");
    setBusy(true);
    const supabase = getSupabase()!;
    const origin = window.location.origin;

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email: address, password });
      if (error) {
        setBusy(false);
        return setError(errorText(error));
      }
      window.location.assign(returnTo);
      return;
    }

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email: address,
        password,
        options: { emailRedirectTo: `${origin}/logowanie?konto=potwierdzone` },
      });
      setBusy(false);
      if (error) return setError(errorText(error));
      // Supabase nie zdradza wprost, że konto istnieje: zwraca wtedy osobę bez żadnego sposobu logowania.
      if (data.user && data.user.identities?.length === 0) return setError(konto.alreadyExists);
      return setSent("signup");
    }

    const { error } = await supabase.auth.resetPasswordForEmail(address, { redirectTo: `${origin}/nowe-haslo` });
    setBusy(false);
    if (error) return setError(errorText(error));
    setSent("reset");
  }

  if (sent) {
    return (
      <div role="status" className="text-center">
        <span aria-hidden="true" className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage text-spruce">
          <svg viewBox="0 0 24 24" className="h-7 w-7">
            <rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="mt-4 font-serif text-2xl font-medium">{sent === "signup" ? konto.signupSentTitle : konto.resetSentTitle}</p>
        <p className="mx-auto mt-2 max-w-md text-moss">
          {(sent === "signup" ? konto.signupSentText : konto.resetSentText).replace("{email}", email.trim())}
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(null);
            switchMode("login");
          }}
          className="mt-5 min-h-11 font-semibold text-cranberry underline underline-offset-4"
        >
          {konto.backToLogin}
        </button>
      </div>
    );
  }

  return (
    <div>
      {mode === "reset" ? (
        <div className="mb-6">
          <p className="font-serif text-2xl font-medium">{konto.resetTitle}</p>
          <p className="mt-2 text-moss">{konto.resetText}</p>
        </div>
      ) : (
        <div role="group" aria-label={konto.tabsLabel} className="mb-7 grid grid-cols-2 gap-1 rounded-full bg-cream p-1">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => switchMode(m)}
              className="min-h-12 whitespace-nowrap rounded-full px-2 text-sm font-semibold sm:text-[0.9375rem] text-moss transition-colors duration-200 aria-pressed:bg-paper aria-pressed:text-spruce aria-pressed:shadow-[0_1px_4px_rgb(31_58_46/0.12)]"
            >
              {m === "login" ? konto.tabLogin : konto.tabSignup}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={onSubmit} noValidate>
        <label htmlFor={`${id}-email`} className="block text-lg font-semibold">
          {konto.emailLabel}
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={konto.emailPlaceholder}
          className={inputClass}
        />

        {mode !== "reset" && (
          <div className="mt-5">
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor={`${id}-password`} className="block text-lg font-semibold">
                {mode === "signup" ? konto.newPasswordLabel : konto.passwordLabel}
              </label>
              {mode === "login" && (
                <button
                  type="button"
                  onClick={() => switchMode("reset")}
                  className="min-h-11 text-sm font-semibold text-cranberry underline-offset-4 hover:underline"
                >
                  {konto.forgot}
                </button>
              )}
            </div>
            <div className="relative">
              <input
                id={`${id}-password`}
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby={mode === "signup" ? `${id}-hint` : undefined}
                className={`${inputClass} pr-24`}
              />
              <button
                type="button"
                aria-pressed={showPassword}
                aria-label={konto.showPasswordLabel}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 mt-1 min-h-11 -translate-y-1/2 rounded-full px-4 text-sm font-semibold text-moss hover:bg-cream"
              >
                {showPassword ? konto.hidePassword : konto.showPassword}
              </button>
            </div>
            {mode === "signup" && (
              <p id={`${id}-hint`} className="mt-2 text-sm text-moss">
                {konto.passwordHint}
              </p>
            )}
          </div>
        )}

        {error && (
          <p role="alert" className="mt-3 text-cranberry">
            {error}
          </p>
        )}

        <Button type="submit" disabled={busy} className="mt-6 w-full">
          {busy ? konto.wait : mode === "login" ? konto.loginButton : mode === "signup" ? konto.signupButton : konto.resetButton}
        </Button>

        {mode === "reset" && (
          <button
            type="button"
            onClick={() => switchMode("login")}
            className="mt-3 min-h-11 w-full font-semibold text-moss underline-offset-4 hover:underline"
          >
            {konto.backToLogin}
          </button>
        )}
      </form>
    </div>
  );
}
