type Params = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Pushes a custom event to the GTM data layer. A no-op on the server; consent is enforced by Consent Mode in GTM. */
export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  (window.dataLayer ??= []).push({ event, ...params });
}

const PRODUCT_HOSTS: Record<string, string> = {
  "cards.priinteve.com": "Nectcard",
  "menu.priinteve.com": "VentaDot",
  "zerox.priinteve.com": "Xerox Buddy",
  "salon.priinteve.com": "Salonly",
};

/**
 * Maps a clicked link to an analytics event. An explicit `data-track` attribute wins; otherwise the link
 * scheme, destination host and page decide. Returns null for links that aren't tracked.
 */
export function eventForLink(a: HTMLAnchorElement): { event: string; params: Params } | null {
  const href = a.getAttribute("href") ?? "";
  const location = a.dataset.trackLocation ?? (a.closest("header") ? "header" : a.closest("footer") ? "footer" : "page");
  if (a.dataset.track) return { event: a.dataset.track, params: { link_location: location, cta_label: a.textContent?.trim().slice(0, 60) ?? "" } };
  if (href.startsWith("tel:")) return { event: "click_phone", params: { link_location: location } };
  if (href.startsWith("mailto:")) return { event: "click_email", params: { link_location: location } };
  if (href === "/contact") return { event: "cta_click", params: { link_location: location, cta_label: a.textContent?.trim().slice(0, 60) ?? "" } };

  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return null;
  }
  if (url.host === window.location.host) return null;
  const product = PRODUCT_HOSTS[url.host];
  if (product) return { event: "product_outbound_click", params: { product_name: product, link_location: location } };
  if (/(^|\.)youtube\.com$/.test(url.host)) return { event: "youtube_click", params: { link_location: location } };
  if (window.location.pathname.startsWith("/work")) return { event: "case_study_outbound_click", params: { client_name: url.host.replace(/^www\./, "") } };
  return null;
}
