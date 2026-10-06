import { site } from "@/content/site";

export type FormKind = "enquiry" | "waitlist";
export type SubmitResult =
  | { ok: true; delivered: boolean; mailto: string }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Single seam for form delivery.
 *
 * No backend or email service is specified in the plan, so nothing is transmitted:
 * the submission is validated, then a pre-filled mailto link is returned and the UI says
 * so plainly (`delivered: false`). To go live, POST `fields` to a route handler / server
 * action / CRM here and return `delivered: true`.
 */
export async function submitForm(kind: FormKind, fields: [string, string][]): Promise<SubmitResult> {
  const get = (k: string) => fields.find(([n]) => n.toLowerCase() === k)?.[1] ?? "";
  if (!get("name")) return { ok: false, error: "Please enter your name." };
  if (!EMAIL_RE.test(get("email"))) return { ok: false, error: "Please enter a valid email address so we can reply." };

  const subject = kind === "waitlist" ? "Priinteve Printing waitlist" : `Enquiry: ${get("i am interested in") || "Priinteve"}`;
  const body = fields.map(([k, v]) => `${k}: ${v}`).join("\n");
  return { ok: true, delivered: false, mailto: `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` };
}
