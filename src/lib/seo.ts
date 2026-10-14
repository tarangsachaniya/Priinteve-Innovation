import type { Metadata } from "next";
import { products } from "@/content/products";
import type { Product } from "@/content/types";
import { site } from "@/content/site";

/** `keywords` is accepted for content files but not emitted: Google ignores the meta keywords tag. */
type PageSeo = { title: string; description: string; keywords?: string };

/** Builds per-page metadata: canonical, Open Graph and Twitter tags. `path` starts with "/" ("/" for home). */
export function buildMetadata(path: string, seo: PageSeo): Metadata {
  return {
    // `absolute` because the plan's title tags already carry the brand; no template suffix.
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      title: seo.title,
      description: seo.description,
      url: path,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: ["/opengraph-image"] },
  };
}

export type Crumb = { name: string; href?: string };

export const abs = (path: string) => `${site.url}${path === "/" ? "" : path}`;

export function breadcrumbLd(trail: Crumb[]) {
  const all: Crumb[] = [{ name: "Home", href: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.href ? { item: abs(c.href) } : {}),
    })),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;
export const founderId = (name: string) => `${site.url}/#${name.toLowerCase().replace(/[^a-z]+/g, "-")}`;

/** Short reference to the one full Organization node, for pages that only need a publisher/provider/creator. */
export const orgRef = { "@id": ORG_ID };

const address = {
  "@type": "PostalAddress",
  streetAddress: site.registeredAddress.street,
  addressLocality: site.registeredAddress.city,
  addressRegion: site.registeredAddress.region,
  postalCode: site.registeredAddress.postalCode,
  addressCountry: "IN",
};

/** Full Organization node. Defined once (homepage and about/contact) and referenced by @id everywhere else. */
export const organizationNode = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: site.name,
  legalName: site.name,
  alternateName: site.brand,
  url: `${site.url}/`,
  logo: { "@type": "ImageObject", "@id": `${site.url}/#logo`, url: abs("/logo-mark.webp"), caption: site.shortName },
  image: abs("/opengraph-image"),
  description: site.description,
  slogan: site.tagline,
  foundingDate: String(site.founded),
  foundingLocation: { "@type": "Place", name: site.location.line },
  founder: site.founders.map((f) => ({ "@id": founderId(f.name) })),
  address,
  telephone: site.phone,
  email: site.email,
  contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", telephone: site.phone, email: site.email, areaServed: "IN", availableLanguage: ["English"] }],
  areaServed: { "@type": "Country", name: "India" },
  knowsAbout: ["Website development", "E-commerce development", "Custom software", "CRM and ERP systems", "NFC and QR solutions", "WhatsApp bots", "Telegram bots", "AI agents", "Business automation"],
  brand: products.map((p) => ({ "@type": "Brand", name: p.name, ...(p.liveUrl ? { url: p.liveUrl } : {}) })),
  sameAs: [site.youtube],
};

export const founderNodes = site.founders.map((f) => ({
  "@type": "Person",
  "@id": founderId(f.name),
  name: f.name,
  jobTitle: f.role,
  worksFor: orgRef,
  url: abs("/about"),
}));

export const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${site.url}/`,
  name: site.name,
  alternateName: site.shortName,
  inLanguage: "en-IN",
  publisher: orgRef,
};

/** Wraps nodes in a single @graph document. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/** A WebPage-family node (WebPage, AboutPage, ContactPage, CollectionPage) tied to the site and organisation. */
export function pageNode(
  type: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage",
  path: string,
  name: string,
  extra: Record<string, unknown> = {},
) {
  return {
    "@type": type,
    "@id": `${site.url}${path === "/" ? "/" : path}#webpage`,
    url: abs(path),
    name,
    isPartOf: { "@id": WEBSITE_ID },
    about: orgRef,
    inLanguage: "en-IN",
    ...extra,
  };
}

/** Offers built from a product's visible, numeric-priced plans, so markup always matches the page. */
export function productOffers(product: Product) {
  const plans = product.pricing?.plans ?? [];
  return plans.flatMap((plan) => {
    const price = Number(plan.price.replace(/[₹,\s]/g, ""));
    if (!Number.isFinite(price) || plan.price.trim() === "") return [];
    return [
      {
        "@type": "Offer",
        name: `${product.name} ${plan.name} (${plan.period})`,
        price: String(price),
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: product.liveUrl ?? abs(`/products/${product.slug}`),
      },
    ];
  });
}

/** Standalone documents for pages that only need the organisation or website node. */
export const organizationLd = graph(organizationNode, ...founderNodes);
export const websiteLd = graph(websiteNode);

/** CollectionPage with an ItemList of its child pages (products, services, work). */
export function collectionPageLd(path: string, name: string, items: { name: string; href: string }[]) {
  return graph(
    pageNode("CollectionPage", path, name, {
      mainEntity: {
        "@type": "ItemList",
        itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: abs(it.href) })),
      },
    }),
  );
}

/** Legal and other plain pages: a WebPage node tied to the site. */
export const webPageLd = (path: string, name: string) => graph(pageNode("WebPage", path, name));
