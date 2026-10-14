export type FormKind = "enquiry" | "waitlist";
export type SubmitResult = { ok: true } | { ok: false; error: string };

export async function submitForm(kind: FormKind, fields: [string, string][], captchaToken: string): Promise<SubmitResult> {
  const response = await fetch("/api/forms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind, fields, captchaToken }),
  });
  const result: unknown = await response.json();
  if (typeof result !== "object" || result === null || !("ok" in result)) {
    throw new Error("The form service returned an invalid response.");
  }
  if (result.ok === true) return { ok: true };
  if ("error" in result && typeof result.error === "string") return { ok: false, error: result.error };
  throw new Error("The form service returned an invalid response.");
}
