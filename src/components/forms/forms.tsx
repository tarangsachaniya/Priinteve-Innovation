"use client";

import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { site } from "@/content/site";
import { track } from "@/lib/track";
import { submitForm, type FormKind, type SubmitResult } from "@/lib/forms";

type Status = "idle" | "loading" | "success" | "error";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let turnstileScript: Promise<void> | null = null;
const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (turnstileScript) return turnstileScript;

  const loading = new Promise<void>((resolve, reject) => {
    let script = document.querySelector<HTMLScriptElement>('script[src^="https://challenges.cloudflare.com/turnstile/"]');
    if (!script) {
      script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.append(script);
    }
    script.addEventListener(
      "load",
      () => (window.turnstile ? resolve() : reject(new Error("Turnstile did not initialize."))),
      { once: true },
    );
    script.addEventListener("error", () => reject(new Error("Turnstile could not be loaded.")), { once: true });
  }).catch((error: unknown) => {
    turnstileScript = null;
    throw error;
  });

  turnstileScript = loading;
  return loading;
}

function Turnstile({ onToken, resetKey }: { onToken: (token: string) => void; resetKey: number }) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const previousResetKey = useRef(resetKey);
  const [message, setMessage] = useState("");
  const siteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    (process.env.NODE_ENV === "development" ? TURNSTILE_TEST_SITE_KEY : undefined);

  useEffect(() => {
    if (!siteKey) return;
    let active = true;
    void loadTurnstile()
      .then(() => {
        if (!active || !container.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(container.current, {
          sitekey: siteKey,
          action: "website_form",
          callback: (token) => {
            onToken(token);
            setMessage("");
          },
          "expired-callback": () => {
            onToken("");
            setMessage("The verification expired. Please complete it again.");
          },
          "error-callback": () => {
            onToken("");
            setMessage("Spam protection could not load. Please refresh and try again.");
          },
        });
      })
      .catch(() => {
        if (active) setMessage("Spam protection could not load. Please refresh and try again.");
      });

    return () => {
      active = false;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
      onToken("");
    };
  }, [onToken, siteKey]);

  useEffect(() => {
    if (previousResetKey.current === resetKey) return;
    previousResetKey.current = resetKey;
    if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
  }, [resetKey]);

  if (!siteKey) {
    return (
      <p role="alert" className="text-sm text-accent">
        {process.env.NODE_ENV === "development"
          ? "Spam protection is not configured: NEXT_PUBLIC_TURNSTILE_SITE_KEY is missing. Add it to .env and restart the dev server."
          : "Spam protection is not configured yet. Please contact us by email."}
      </p>
    );
  }

  return (
    <div className="sm:col-span-2">
      <div ref={container} />
      {message && <p role="alert" className="mt-2 text-sm text-accent">{message}</p>}
    </div>
  );
}

const FIELD =
  "w-full border-0 border-b border-fg/25 bg-transparent px-0 py-3 text-lg text-fg placeholder:text-muted/60 transition-colors duration-300 focus:border-accent focus:outline-none focus:ring-0 focus-visible:outline-none";

function Field({ label, children, id, className }: { label: string; children: ReactNode; id: string; className?: string }) {
  return (
    <div className={`grid gap-1 ${className ?? ""}`}>
      <label htmlFor={id} className="label text-muted">
        {label}
      </label>
      {children}
    </div>
  );
}

/** Shared state machine: idle → loading → success | error. */
function useFormState(kind: FormKind, fieldNames: Record<string, string>) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<Extract<SubmitResult, { ok: true }> | null>(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaReset, setCaptchaReset] = useState(0);
  const submitting = useRef(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting.current) return;
    if (!captchaToken) {
      setError("Please complete the spam protection check and try again.");
      setStatus("error");
      return;
    }
    submitting.current = true;
    const fd = new FormData(e.currentTarget);
    const fields = Object.entries(fieldNames).map<[string, string]>(([name, label]) => [label, String(fd.get(name) ?? "").trim()]);
    setStatus("loading");
    setError("");
    try {
      const r = await submitForm(kind, fields, captchaToken);
      if (r.ok) {
        setResult(r);
        setStatus("success");
        // Fired only after the server confirmed delivery, so failed or spam submissions are never counted.
        if (kind === "enquiry") {
          track("generate_lead", { form_topic: fields.find(([label]) => label === "Enquiry about")?.[1] || "unspecified", page_path: window.location.pathname });
        } else {
          track("waitlist_signup", { product_name: window.location.pathname.split("/").pop() || "unknown" });
        }
      } else {
        setError(r.error);
        setStatus("error");
      }
    } catch {
      setError("Something went wrong. Please try again, or email contact@priinteve.com.");
      setStatus("error");
    } finally {
      submitting.current = false;
      setCaptchaToken("");
      setCaptchaReset((key) => key + 1);
    }
  }
  return {
    status,
    error,
    result,
    onSubmit,
    captchaToken,
    setCaptchaToken,
    captchaReset,
    reset: () => {
      setStatus("idle");
      setError("");
      setResult(null);
      setCaptchaToken("");
      setCaptchaReset((key) => key + 1);
    },
  };
}

function Feedback({ status, error, result, onReset }: { status: Status; error: string; result: ReturnType<typeof useFormState>["result"]; onReset: () => void }) {
  return (
    <div aria-live="polite">
      {status === "error" && (
        <p role="alert" className="flex items-start gap-3 rounded-2xl bg-accent/10 px-5 py-4 text-base text-accent">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          {error}
        </p>
      )}
      {status === "success" && result && (
        <div className="rounded-3xl bg-bg-2 p-6 text-base">
          <p className="flex items-center gap-3 font-display text-2xl">
            <CheckCircle2 aria-hidden="true" className="size-6 text-accent" />
            Message sent
          </p>
          <p className="mt-3 text-muted">
            We received your message and will get back to you soon. You can also write to {site.email} or call {site.phone}.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={onReset} className="rounded-full border border-line px-6 py-3 font-semibold hover:border-fg">
              Send another message
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Submit({ status, disabled, children }: { status: Status; disabled?: boolean; children: ReactNode }) {
  const loading = status === "loading";
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      aria-busy={loading}
      className="inline-flex w-fit items-center justify-center gap-3 rounded-full bg-accent-strong px-8 py-4 font-semibold text-on-accent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_36px_-6px_rgb(107_142_61/0.8)] disabled:pointer-events-none disabled:opacity-60"
    >
      {loading && <Loader2 aria-hidden="true" className="size-4 animate-spin" />}
      {loading ? "Sending…" : children}
    </button>
  );
}

const WAITLIST_NAMES: Record<string, { name: string; type?: string; auto?: string; required?: boolean }> = {
  Name: { name: "name", auto: "name", required: true },
  Phone: { name: "phone", type: "tel", auto: "tel" },
  Email: { name: "email", type: "email", auto: "email", required: true },
  "What you want to print": { name: "print" },
  "Usual quantity": { name: "quantity" },
};

const ENQUIRY_TOPICS = [
  "Website & E-commerce",
  "Software, CRM & ERP",
  "NFC & QR",
  "Automation, Bots & AI",
  "Product enquiry",
  "Other",
];

export function EnquiryForm() {
  const uid = useId();
  const s = useFormState("enquiry", {
    name: "Name",
    email: "Email",
    phone: "Phone",
    interest: "Enquiry about",
    message: "Message",
  });
  const done = s.status === "success";

  return (
    <form onSubmit={s.onSubmit} noValidate className="grid gap-x-7 gap-y-7 sm:grid-cols-2">
      {!done && (
        <>
          <Field label="Name" id={`${uid}-name`}>
            <input id={`${uid}-name`} name="name" autoComplete="name" required className={FIELD} />
          </Field>
          <Field label="Email" id={`${uid}-email`}>
            <input id={`${uid}-email`} name="email" type="email" autoComplete="email" required className={FIELD} />
          </Field>
          <Field label="Phone (optional)" id={`${uid}-phone`}>
            <input id={`${uid}-phone`} name="phone" type="tel" autoComplete="tel" className={FIELD} />
          </Field>
          <Field label="What can we help with?" id={`${uid}-interest`}>
            <select id={`${uid}-interest`} name="interest" className={`${FIELD} min-h-[3.3125rem]`} defaultValue="">
              <option value="">Choose a topic</option>
              {ENQUIRY_TOPICS.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Your message" id={`${uid}-message`} className="sm:col-span-2">
            <textarea id={`${uid}-message`} name="message" rows={4} required className={`${FIELD} resize-y`} />
          </Field>
          <Turnstile onToken={s.setCaptchaToken} resetKey={s.captchaReset} />
          <div className="sm:col-span-2"><Submit status={s.status} disabled={!s.captchaToken}>Send enquiry</Submit></div>
          <p className="-mt-3 text-sm text-muted sm:col-span-2">Your enquiry will be sent securely to our team by email.</p>
        </>
      )}
      <div className="sm:col-span-2">
        <Feedback status={s.status} error={s.error} result={s.result} onReset={s.reset} />
      </div>
    </form>
  );
}

export function WaitlistForm({ fields }: { fields: string[] }) {
  const uid = useId();
  const s = useFormState("waitlist", Object.fromEntries(fields.map((f) => [WAITLIST_NAMES[f]?.name ?? f, f])));
  const done = s.status === "success";
  return (
    <form onSubmit={s.onSubmit} noValidate className="grid gap-8">
      {fields.map((f) => {
        const m = WAITLIST_NAMES[f] ?? { name: f };
        const id = `${uid}-${m.name}`;
        return (
          <Field key={f} label={f} id={id}>
            <input id={id} name={m.name} type={m.type} autoComplete={m.auto} required={m.required} className={FIELD} />
          </Field>
        );
      })}
      {!done && <Turnstile onToken={s.setCaptchaToken} resetKey={s.captchaReset} />}
      {!done && <Submit status={s.status} disabled={!s.captchaToken}>Join the waitlist</Submit>}
      {!done && <p className="-mt-4 text-sm text-muted">Your details will be sent securely to our team by email.</p>}
      <Feedback status={s.status} error={s.error} result={s.result} onReset={s.reset} />
    </form>
  );
}
