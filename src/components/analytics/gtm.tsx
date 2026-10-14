import { GoogleTagManager } from "@next/third-parties/google";

/** GTM container ID. Override with NEXT_PUBLIC_GTM_ID; set it to an empty string to switch analytics off. */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-W9PGZ3RG";

/**
 * Google Tag Manager (script). Consent defaults (everything denied) are set by CONSENT_SCRIPT in the layout
 * before this loads, so GA4 sets no cookies until the visitor opts in.
 */
export function Gtm() {
  return GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null;
}

/** GTM's noscript fallback. It belongs at the top of <body>. */
export function GtmNoscript() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" />
    </noscript>
  );
}
