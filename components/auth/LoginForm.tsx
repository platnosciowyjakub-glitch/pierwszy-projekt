"use client";

import { useId, useState, type FormEvent } from "react";
import { konto } from "@/content/konto";
import { getSupabase } from "@/lib/supabase";
import { isValidEmail } from "@/lib/email";
import { Button } from "@/components/ui/Button";

// Logowanie linkiem z e-maila. Po kliknięciu linku osoba wraca na stronę podaną w returnTo.
export function LoginForm({ returnTo = "/prezenty", autoFocus = false }: { returnTo?: string; autoFocus?: boolean }) {
  const id = useId();
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (!isValidEmail(value)) {
      setError(konto.emailInvalid);
      return;
    }
    setError("");
    setState("sending");
    const { error } = await getSupabase()!.auth.signInWithOtp({
      email: value,
      options: { emailRedirectTo: `${window.location.origin}${returnTo}` },
    });
    if (error) {
      setState("idle");
      setError(konto.loginError);
    } else {
      setState("sent");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="text-center">
        <span aria-hidden="true" className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage text-spruce">
          <svg viewBox="0 0 24 24" className="h-7 w-7">
            <rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="mt-4 font-serif text-2xl font-medium">{konto.sentTitle}</p>
        <p className="mx-auto mt-2 max-w-md text-moss">{konto.sentText.replace("{email}", email.trim())}</p>
        <button type="button" onClick={() => setState("idle")} className="mt-5 min-h-11 font-semibold text-cranberry underline underline-offset-4">
          {konto.sendAgain}
        </button>
      </div>
    );
  }

  return (
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
        autoFocus={autoFocus}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={konto.emailPlaceholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-2 min-h-14 w-full rounded-soft border-2 border-line bg-paper px-5 text-lg text-spruce placeholder:text-moss/70 focus:border-spruce focus:outline-none"
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-cranberry">
          {error}
        </p>
      )}
      <Button type="submit" disabled={state === "sending"} className="mt-4 w-full">
        {state === "sending" ? konto.sending : konto.sendLink}
      </Button>
    </form>
  );
}
