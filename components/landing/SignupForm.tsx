"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { landing } from "@/content/landing";
import { siteConfig } from "@/config/site";
import { isValidEmail } from "@/lib/email";
import { Button } from "@/components/ui/Button";
import { Star } from "@/components/illustrations/Star";

type Status = "idle" | "loading" | "success";
type Errors = { email?: string; consent?: string; form?: string };

const t = landing.signup;

export function SignupForm({ note }: { note?: string }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const thanksRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const consent = data.get("consent") === "on";

    const next: Errors = {};
    if (!email) next.email = t.errors.emailEmpty;
    else if (!isValidEmail(email)) next.email = t.errors.emailInvalid;
    if (!consent) next.consent = t.errors.consent;
    setErrors(next);
    if (next.email || next.consent) {
      const form = event.currentTarget;
      (form.querySelector<HTMLElement>(next.email ? "input[type=email]" : "input[type=checkbox]"))?.focus();
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/zapisy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent, company: data.get("company") }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      requestAnimationFrame(() => thanksRef.current?.focus());
    } catch {
      setStatus("idle");
      setErrors({ form: t.errors.server });
    }
  }

  if (status === "success") {
    return (
      <div
        ref={thanksRef}
        tabIndex={-1}
        role="status"
        className="rise-in flex items-start gap-4 rounded-card bg-sand p-6 shadow-soft outline-none"
      >
        <Star className="glow mt-1 h-7 w-7 shrink-0 text-gold" />
        <div>
          <p className="font-serif text-xl">{t.success.title}</p>
          <p className="mt-1 text-moss">{t.success.text}</p>
        </div>
      </div>
    );
  }

  const emailErrorId = `${id}-email-error`;
  const consentErrorId = `${id}-consent-error`;

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <label htmlFor={`${id}-email`} className="mb-2 block text-base font-semibold">
        {t.emailLabel}
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={t.emailPlaceholder}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? emailErrorId : undefined}
          onChange={() => errors.email && setErrors((e) => ({ ...e, email: undefined }))}
          className="min-h-12 w-full min-w-0 flex-1 rounded-soft border border-sand-deep bg-white/70 px-4 py-3 text-base text-spruce placeholder:text-moss/70 transition duration-200 ease-calm focus:border-moss focus:bg-white focus:outline-none focus-visible:outline-2 focus-visible:outline-cranberry aria-invalid:border-cranberry"
        />
        <Button type="submit" disabled={status === "loading"} className="sm:shrink-0">
          {status === "loading" ? t.buttonLoading : t.button}
        </Button>
      </div>
      {errors.email && (
        <p id={emailErrorId} className="mt-2 text-sm text-cranberry">
          {errors.email}
        </p>
      )}

      {/* Pułapka na boty: pole niewidoczne dla ludzi i czytników ekranu */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Firma
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-4 flex items-start gap-3">
        <input
          id={`${id}-consent`}
          name="consent"
          type="checkbox"
          aria-invalid={errors.consent ? true : undefined}
          aria-describedby={errors.consent ? consentErrorId : undefined}
          onChange={() => errors.consent && setErrors((e) => ({ ...e, consent: undefined }))}
          className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded accent-cranberry"
        />
        <label htmlFor={`${id}-consent`} className="cursor-pointer text-sm leading-relaxed text-moss">
          {t.consent}{" "}
          <a href={siteConfig.links.privacy} className="underline decoration-gold underline-offset-4 hover:text-spruce">
            {t.consentLink}
          </a>
          .
        </label>
      </div>
      {errors.consent && (
        <p id={consentErrorId} className="mt-2 text-sm text-cranberry">
          {errors.consent}
        </p>
      )}

      <p role="alert" className="text-sm text-cranberry empty:hidden [&:not(:empty)]:mt-3">
        {errors.form}
      </p>

      {note && <p className="mt-4 text-sm text-moss">{note}</p>}
    </form>
  );
}
