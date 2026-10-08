import type { MetadataRoute } from "next";
import { legalPages } from "@/content/legal";
import { products } from "@/content/products";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { projects } from "@/content/work";

/** Every public page. */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: [string, number][] = [
    ["", 1],
    ...["/about", "/products", "/services", "/work", "/faq", "/contact"].map<[string, number]>((p) => [p, 0.8]),
    ...products.map<[string, number]>((p) => [`/products/${p.slug}`, 0.8]),
    ...services.map<[string, number]>((s) => [`/services/${s.slug}`, 0.7]),
    ...projects.map<[string, number]>((p) => [`/work/${p.slug}`, 0.6]),
    ...legalPages.map<[string, number]>((p) => [`/${p.slug}`, 0.3]),
  ];
  return entries.map(([p, priority]) => ({ url: `${site.url}${p}`, priority, lastModified: "2026-10-08" }));
}
