import nodemailer from "nodemailer";
import type { FormKind } from "@/lib/forms";

const RECIPIENTS = ["tarangsachaniya8@gmail.com", "naitikhkhaniya@gmail.com"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TURNSTILE_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

type FormFields = [string, string][];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isFormKind(value: unknown): value is FormKind {
  return value === "enquiry" || value === "waitlist";
}

function isFormFields(value: unknown): value is FormFields {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.length <= 20 &&
    value.every(
      (entry) =>
        Array.isArray(entry) &&
        entry.length === 2 &&
        typeof entry[0] === "string" &&
        entry[0].trim().length > 0 &&
        entry[0].length <= 100 &&
        typeof entry[1] === "string" &&
        entry[1].length <= 2000,
    )
  );
}

async function verifyCaptcha(token: unknown, request: Request): Promise<boolean> {
  const secret =
    process.env.TURNSTILE_SECRET_KEY ||
    (process.env.NODE_ENV === "development" ? TURNSTILE_TEST_SECRET_KEY : undefined);
  if (!secret) {
    console.error("Form spam protection is not configured. Set TURNSTILE_SECRET_KEY.");
    throw new Error("Spam protection is temporarily unavailable.");
  }
  if (typeof token !== "string" || token.length === 0 || token.length > 2048) return false;

  const body = new URLSearchParams({ secret, response: token });
  const remoteIp = request.headers.get("cf-connecting-ip");
  if (remoteIp) body.set("remoteip", remoteIp);

  let response: Response;
  try {
    response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
  } catch (error) {
    console.error("Cloudflare Turnstile verification request failed.", error);
    throw new Error("Spam protection could not be reached.");
  }

  if (!response.ok) {
    console.error("Cloudflare Turnstile verification returned an unsuccessful HTTP status.", response.status);
    throw new Error("Spam protection could not be reached.");
  }

  let result: unknown;
  try {
    result = await response.json();
  } catch (error) {
    console.error("Cloudflare Turnstile verification returned an invalid response.", error);
    throw new Error("Spam protection could not be reached.");
  }
  return (
    isRecord(result) &&
    result.success === true &&
    (
      result.action === "website_form" ||
      (process.env.NODE_ENV === "development" && (result.action === "test" || result.action == null))
    )
  );
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid form submission." }, { status: 400 });
  }

  if (!isRecord(payload)) {
    return Response.json({ ok: false, error: "Please check the submitted form and try again." }, { status: 400 });
  }
  const kind = payload.kind;
  const fields = payload.fields;
  if (!isFormKind(kind) || !isFormFields(fields)) {
    return Response.json({ ok: false, error: "Please check the submitted form and try again." }, { status: 400 });
  }

  const get = (label: string) => fields.find(([name]) => name.toLowerCase() === label)?.[1] ?? "";
  const name = get("name").trim();
  const email = get("email").trim();
  if (!name) return Response.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  if (!EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "Please enter a valid email address so we can reply." }, { status: 400 });
  }
  if (kind === "enquiry" && !get("message").trim()) {
    return Response.json({ ok: false, error: "Please enter a message." }, { status: 400 });
  }

  try {
    if (!(await verifyCaptcha(payload.captchaToken, request))) {
      return Response.json(
        { ok: false, error: "Please complete the spam protection check and try again." },
        { status: 400 },
      );
    }
  } catch {
    return Response.json(
      { ok: false, error: "Spam protection is temporarily unavailable. Please try again shortly." },
      { status: 503 },
    );
  }

  const gmailUser = process.env.GMAIL_USER ?? process.env.EMAIL_USER;
  const gmailAppPassword = (process.env.GMAIL_APP_PASSWORD ?? process.env.EMAIL_PASS)?.replace(/\s/g, "");
  if (!gmailUser || !gmailAppPassword) {
    console.error("Form email delivery is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.");
    return Response.json(
      { ok: false, error: "Our form service is temporarily unavailable. Please email contact@priinteve.com." },
      { status: 503 },
    );
  }

  const subject =
    kind === "waitlist"
      ? "Priinteve Printing waitlist signup"
      : `Website enquiry: ${get("enquiry about").replace(/[\r\n]/g, "").slice(0, 100) || "Priinteve"}`;
  const text = fields.map(([label, value]) => `${label.replace(/[\r\n]/g, "")}: ${value}`).join("\n");
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: gmailUser, pass: gmailAppPassword },
  });

  try {
    await transporter.sendMail({
      from: { name: "Priinteve Website", address: gmailUser },
      to: RECIPIENTS,
      replyTo: email,
      subject,
      text,
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Failed to send website form email.", error);
    return Response.json(
      { ok: false, error: "We could not send your message. Please try again or email contact@priinteve.com." },
      { status: 502 },
    );
  }
}
