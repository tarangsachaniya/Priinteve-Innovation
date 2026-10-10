import type { Media } from "./types";

export type BrandProject = {
  slug: string;
  name: string;
  client: string;
  type: string;
  year: string;
  summary: string;
  palette?: string[];
  /** first image is the cover */
  images: Media[];
};

const img = (name: string, alt: string, width: number, height: number): Media => ({ src: `/media/brand/${name}.webp`, alt, width, height });

/** Branding, packaging and social design work, shown on the Branding service page. */
export const brandWork: BrandProject[] = [
  {
    slug: "mirae",
    name: "Mirae Candles",
    client: "Mirae",
    type: "Package Design",
    year: "2026",
    summary:
      "Packaging for a premium candle brand with a minimal retro direction. Instead of playful graphics or fragrance illustrations, the design leans on typography, restraint and warm, nostalgic character, so the product feels calm, refined and memorable to design-aware working professionals.",
    palette: ["#C8D6E5", "#EFC467", "#2E2C2B", "#7A8A73", "#F9F0E0", "#EEAD94"],
    images: [
      img("mirae-candle", "Mirae Time Capsule candle jar with its minimal retro label", 1800, 1800),
      img("mirae-posts", "Mirae social posts and brand cards presented together", 1800, 1200),
      img("mirae-type", "Mirae typeface pairing: Optima nova LT Pro and Bricolage Grotesque", 1800, 1013),
    ],
  },
  {
    slug: "revo",
    name: "Revo",
    client: "Revo",
    type: "Brand Identity",
    year: "2026",
    summary:
      "A hand-lettered wordmark built on one idea: REVO is OVER reversed. The mark pairs the word with a directional arrow that points back toward the self, about arriving by turning inward rather than moving forward, set in a dark, warm palette of ink black, aged gold and burnt amber.",
    palette: ["#0B0B0A", "#3E3B38", "#EDE6D8", "#5C1B1A", "#A85C1F", "#B8935A"],
    images: [
      img("revo-hero", "Revo brand visual of a fragrance bottle in water", 1584, 672),
      img("revo-logo", "Revo hand-lettered wordmark", 1800, 1800),
      img("revo-concept", "Revo logo concept: wordmark plus a backward arrow, REVO reversed from OVER", 1800, 1013),
    ],
  },
  {
    slug: "satatya",
    name: "Satatya Ayurveda",
    client: "Satatya Ayurveda",
    type: "Post Design",
    year: "2025",
    summary:
      "Satatya is an Ayurvedic brand whose products are made by hand at home with genuine care. The products were strong, but the social posts lacked a consistent look. We redesigned the post templates into a clean, cohesive identity, with Gujarati typography and an earthy palette, that reflects the authenticity of the products.",
    palette: ["#72320F", "#BC6C25", "#DCA15D", "#5F6C37", "#FEFADF"],
    images: [
      img("satatya-phones", "Satatya Ayurveda social posts shown on a phone and cards", 1800, 1200),
      img("satatya-posts", "A set of Satatya Ayurveda post designs", 1800, 982),
      img("satatya-palette", "Satatya Ayurveda colour palette", 1080, 1080),
    ],
  },
  {
    slug: "visionary-ventures",
    name: "Visionary Ventures",
    client: "Visionary Ventures",
    type: "Post Design",
    year: "2025",
    summary:
      "A social post system for Visionary Ventures: a dark, tech-forward look built around a bold V mark, with lime and sky-blue accents that keep carousels on AI, products and tips instantly recognisable in the feed.",
    palette: ["#BAFE6D", "#7DCFFF"],
    images: [
      img("visionary-phones", "Visionary Ventures posts presented on phone screens", 1800, 1000),
      img("visionary-post", "A Visionary Ventures carousel post", 1800, 1200),
      img("visionary-logo", "Visionary Ventures V mark", 1080, 1080),
    ],
  },
  {
    slug: "wholicius",
    name: "Wholicius",
    client: "Wholicius Foods",
    type: "Ad and Post Design",
    year: "2026",
    summary:
      "Ad assets and social posts for Wholicius Foods, built on the brand's promise of wholesome, conscious and delicious food. A deep green and warm cream palette, illustrated product moments and consistent layouts carry the brand from ads to the feed to print.",
    palette: ["#F6DBAF", "#114C47"],
    images: [
      img("wholicius-hero", "Wholicius ad creatives presented on cards and a phone", 1800, 1013),
      img("wholicius-grid", "A grid of Wholicius social posts", 1800, 1013),
      img("wholicius-book", "Wholicius branded notebook", 1800, 1201),
    ],
  },
];
