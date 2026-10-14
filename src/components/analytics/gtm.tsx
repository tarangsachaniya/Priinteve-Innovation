import { GoogleTagManager } from "@next/third-parties/google";

/**
 * Google Tag Manager, loaded only when NEXT_PUBLIC_GTM_ID is set. Consent defaults (everything denied) are
 * set by CONSENT_SCRIPT in the layout before this loads, so GA4 stays cookieless until the visitor opts in.
 */
export function Gtm() {
  const id = process.env.NEXT_PUBLIC_GTM_ID;
  return id ? <GoogleTagManager gtmId={id} /> : null;
}
