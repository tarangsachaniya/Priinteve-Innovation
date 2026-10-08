"use client";

import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { ENQUIRY_INTERESTS, site } from "@/content/site";
import { submitForm, type FormKind, type SubmitResult } from "@/lib/forms";

type Status = "idle" | "loading" | "success" | "error";

const FIELD =
  "w-full border-0 border-b border-fg/25 bg-transparent px-0 py-3 text-lg text-fg placeholder:text-muted/60 transition-colors duration-300 focus:border-accent focus:outline-none focus:ring-0 focus-visible:outline-none";

function Field({ label, children, id }: { label: string; children: ReactNode; id: string }) {
  return (
    <div className="grid gap-1">
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

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const fields = Object.entries(fieldNames).map<[string, string]>(([name, label]) => [label, String(fd.get(name) ?? "").trim()]);
    setStatus("loading");
    setError("");
    try {
      const r = await submitForm(kind, fields);
      if (r.ok) {
        setResult(r);
        setStatus("success");
      } else {
        setError(r.error);
        setStatus("error");
      }
    } catch {
      setError("Something went wrong. Please try again, or email contact@priinteve.com.");
      setStatus("error");
    }
  }
  return { status, error, result, onSubmit, reset: () => setStatus("idle") };
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
            Details captured
          </p>
          <p className="mt-3 text-muted">
            Online delivery is not connected yet, so your message has <strong className="text-fg">not been sent</strong>. Open it in your email app to send it, or write to {site.email} or call {site.phone}.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={result.mailto} className="rounded-full bg-accent px-6 py-3 font-semibold text-on-accent">
              Open in email app
            </a>
            <button type="button" onClick={onReset} className="rounded-full border border-line px-6 py-3 font-semibold hover:border-fg">
              Edit details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Submit({ status, children }: { status: Status; children: ReactNode }) {
  const loading = status === "loading";
  return (
    <button
      type="submit"
      disabled={loading}
      aria-busy={loading}
      className="inline-flex w-fit items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 font-semibold text-on-accent transition-all duration-300 hover:bg-fg hover:text-bg disabled:pointer-events-none disabled:opacity-60"
    >
      {loading && <Loader2 aria-hidden="true" className="size-4 animate-spin" />}
      {loading ? "Sending…" : children}
    </button>
  );
}

export function EnquiryForm({ defaultInterest }: { defaultInterest?: (typeof ENQUIRY_INTERESTS)[number] }) {
  const uid = useId();
  const s = useFormState("enquiry", {
    name: "Name",
    phone: "Phone",
    email: "Email",
    interest: "I am interested in",
    business: "Business name and type",
    message: "Message",
  });
  const id = (n: string) => `${uid}-${n}`;
  const done = s.status === "success";
  return (
    <form onSubmit={s.onSubmit} noValidate className="grid gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Name" id={id("name")}>
          <input id={id("name")} name="name" required autoComplete="name" className={FIELD} />
        </Field>
        <Field label="Phone" id={id("phone")}>
          <input id={id("phone")} name="phone" type="tel" autoComplete="tel" className={FIELD} />
        </Field>
      </div>
      <Field label="Email" id={id("email")}>
        <input id={id("email")} name="email" type="email" required autoComplete="email" className={FIELD} />
      </Field>
      <Field label="I am interested in" id={id("interest")}>
        <select id={id("interest")} name="interest" defaultValue={defaultInterest ?? ENQUIRY_INTERESTS[0]} className={FIELD}>
          {ENQUIRY_INTERESTS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </Field>
      <Field label="Business name and type" id={id("business")}>
        <input id={id("business")} name="business" className={FIELD} />
      </Field>
      <Field label="Message" id={id("message")}>
        <textarea id={id("message")} name="message" rows={3} className={FIELD} />
      </Field>
      {!done && <Submit status={s.status}>Send enquiry</Submit>}
      <Feedback status={s.status} error={s.error} result={s.result} onReset={s.reset} />
    </form>
  );
}

const WAITLIST_NAMES: Record<string, { name: string; type?: string; auto?: string; required?: boolean }> = {
  Name: { name: "name", auto: "name", required: true },
  Phone: { name: "phone", type: "tel", auto: "tel" },
  Email: { name: "email", type: "email", auto: "email", required: true },
  "What you want to print": { name: "print" },
  "Usual quantity": { name: "quantity" },
};

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
      {!done && <Submit status={s.status}>Join the waitlist</Submit>}
      <Feedback status={s.status} error={s.error} result={s.result} onReset={s.reset} />
    </form>
  );
}
