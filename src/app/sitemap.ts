import type { MetadataRoute } from "next";
import { LEGAL_UPDATED, legalPages } from "@/content/legal";
import { products } from "@/content/products";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { projects } from "@/content/work";

/** Bump when page content changes materially. Legal pages carry their own date (LEGAL_UPDATED). */
const CONTENT_UPDATED = "2026-10-14";

/** Every public page. Google ignores priority and changefreq, so only `lastModified` is set. */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: [string, string][] = [
    ["", CONTENT_UPDATED],
    ...["/about", "/products", "/services", "/work", "/faq", "/contact"].map<[string, string]>((p) => [p, CONTENT_UPDATED]),
    ...products.map<[string, string]>((p) => [`/products/${p.slug}`, CONTENT_UPDATED]),
    ...services.map<[string, string]>((s) => [`/services/${s.slug}`, CONTENT_UPDATED]),
    ...projects.map<[string, string]>((p) => [`/work/${p.slug}`, CONTENT_UPDATED]),
    ...legalPages.map<[string, string]>((p) => [`/${p.slug}`, LEGAL_UPDATED]),
  ];
  return entries.map(([p, lastModified]) => ({ url: `${site.url}${p}`, lastModified }));
}
