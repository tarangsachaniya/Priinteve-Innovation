import type { Media, Project } from "./types";

/*
 * Client work. Descriptions and highlights reflect what is visible on each live site (audited October 2026).
 * No results, metrics or testimonials are claimed. Images in /public/media/work are the projects' own
 * published imagery and full-page screenshots of the live sites.
 */

const m = (file: string, alt: string, width: number, height: number): Media => ({ src: `/media/work/${file}.webp`, alt, width, height });

export const projects: Project[] = [
  {
    slug: "quantivo",
    name: "Quantivo",
    category: "Website / Digital experience",
    summary: "A scroll-driven website for Quantivo Digitals, a digital marketing, branding and 3D visualisation studio, built to present its services, portfolio and approach.",
    client: "Quantivo Digitals, a digital marketing and creative studio",
    service: "website-design-development",
    icon: "trending",
    colors: ["#12270a", "#6b8e3d"],
    liveUrl: "https://www.quantivodigitals.com/",
    domain: "quantivodigitals.com",
    seo: {
      title: "Quantivo Website | Digital Marketing Studio Case Study | Priinteve",
      description: "A scroll-driven website for Quantivo Digitals presenting its digital growth, branding, website and 3D visualisation services, portfolio and approach, built by Priinteve.",
    },
    overview: [
      "Quantivo Digitals is a studio that brings digital growth, branding and packaging, website development and 3D visualisation under one roof. Its website needed to explain a wide offer clearly and show the quality of the studio's visual work.",
      "We built a dark, editorial website with a rotating hero, grouped services, a portfolio of case studies and a scroll-driven presentation of the studio's five-step approach.",
    ],
    highlights: [
      { title: "Rotating service hero", text: "A full-width hero that cycles through packaging design, social media, and 3D product and architectural visualisation." },
      { title: "Grouped services", text: "Four numbered service groups: Digital Growth, Brand & Creative, Digital Experiences and 3D Visualization." },
      { title: "Case-study portfolio", text: "A browsable portfolio of projects, each with its own case-study page." },
      { title: "Scroll-driven approach", text: "Five steps (Discover, Define, Create, Deliver, Grow) presented along a path that advances as the visitor scrolls." },
      { title: "Articles and FAQ", text: "An articles section and an FAQ answering common client questions." },
      { title: "Enquiry flow", text: "A closing call to action and an enquiry form for new projects." },
    ],
    scope: { heading: "Website sections", items: ["Hero", "About", "Services", "Portfolio", "Approach", "Team", "Articles", "FAQ", "Contact"] },
    media: {
      cover: m("quantivo-desktop", "Quantivo website hero", 1440, 900),
      desktop: m("quantivo-desktop", "Quantivo website home page", 1440, 900),
      mobile: m("quantivo-mobile", "Quantivo website on a phone", 390, 844),
      gallery: [
        m("quantivo-services", "Quantivo website: Digital Growth service group", 1440, 900),
        m("quantivo-approach", "Quantivo website: scroll-driven five-step approach", 1440, 900),
      ],
    },
  },
  {
    slug: "royal-timber",
    name: "Royal Timber",
    category: "Timber & plywood supplier",
    summary: "A trilingual website and material library for a timber, plywood and wood-products supplier in Lati Bazar, Ahmedabad.",
    client: "a timber and plywood supplier in Ahmedabad",
    service: "website-design-development",
    icon: "layers",
    colors: ["#1b241f", "#a0824a"],
    liveUrl: "https://www.royaltimber.co.in/",
    domain: "royaltimber.co.in",
    seo: {
      title: "Royal Timber Website | Timber & Plywood Supplier Case Study | Priinteve",
      description:
        "A trilingual website and material library for Royal Timber, a timber, plywood, MDF, veneer and laminate supplier in Lati Bazar, Ahmedabad, designed and built by Priinteve.",
    },
    overview: [
      "Royal Timber is a timber, plywood and wood-products supplier based in Lati Bazar, Ahmedabad's traditional timber market. It stocks Burma and African teak, plywood and blockboard, MDF, veneers, laminates, edge bands, adhesives and hardware for homes, interiors, furniture and architecture.",
      "The website had to do two jobs: present a large and technical range so architects, contractors and homeowners can find the right material, and turn that interest into enquiries and yard visits.",
    ],
    highlights: [
      { title: "Material library", text: "Seven families of material, from timber and plywood to laminates and hardware, each with its uses explained." },
      { title: "Guided selection", text: "A 'What are you building?' selector that recommends materials for furniture, kitchens, offices, doors, transport and more." },
      { title: "Browsable catalogue", text: "Every product in the range, by family, with an enquiry on tap." },
      { title: "Three languages", text: "The site is available in English, Gujarati and Hindi." },
      { title: "Quality and certifications", text: "A section on termite and borer resistance, CARB P2 low-emission MDF and warranty-backed boards." },
      { title: "Visit the yard", text: "Location, map and enquiry calls to action for customers who want to see the material in person." },
    ],
    scope: { heading: "Materials presented", items: ["Timber", "Plywood", "Blockboard", "MDF", "Veneers", "Laminates", "Border Patti / edge bands", "Adhesive and hardware"] },
    media: {
      cover: m("royal-timber-yard", "Stacked teak planks in the Royal Timber yard", 1600, 899),
      desktop: m("royal-timber-desktop", "Royal Timber website home page", 1440, 900),
      mobile: m("royal-timber-mobile", "Royal Timber website on a phone", 390, 844),
      gallery: [
        m("royal-timber-shop", "Inside the Royal Timber shop in Lati Bazar", 1448, 1086),
        m("royal-timber-timber", "Timber from the Royal Timber material library", 1400, 1050),
        m("royal-timber-homes", "Wood interiors for homes, from the applications section", 1400, 1050),
        m("royal-timber-section", "Royal Timber website: sourced from trusted forests", 1440, 900),
      ],
    },
    alsoUses: { product: "nectcard", text: "Royal Timber also shares its contact details with a Nectcard digital business card.", href: "https://cards.priinteve.com/keval-royal-timber" },
  },
  {
    slug: "premium-cashew-ecommerce",
    name: "Premium Cashew E-commerce",
    category: "E-commerce / D2C",
    summary: "EarthOra: a premium D2C storefront for single-estate cashews, with product storytelling, flavours, gifting and a mobile-first shop.",
    client: "EarthOra, a premium cashew brand",
    service: "ecommerce-websites",
    icon: "leaf",
    colors: ["#18330d", "#c29b48"],
    liveUrl: "https://earthorafood.com/",
    domain: "earthorafood.com",
    seo: {
      title: "Premium Cashew E-commerce (EarthOra) | D2C Store Case Study | Priinteve",
      description:
        "EarthOra, a premium D2C cashew store: product storytelling, flavours, pack sizes, gifting and a mobile-first shopping experience, designed and built by Priinteve.",
    },
    overview: [
      "EarthOra sells handpicked, single-estate cashews: raw, roasted, salted and spiced, with no oil and no preservatives. For a premium food brand, the store has to feel as considered as the product.",
      "The storefront tells the brand's story, from orchard to grading to packing, and makes it simple to choose a flavour and pack size and add it to the cart, especially on a phone.",
    ],
    highlights: [
      { title: "Brand storytelling", text: "A hero, story and process sections that follow the cashew from orchard to pouch." },
      { title: "Flavour range", text: "Classic and spiced flavours, each with its own product card and packaging visual." },
      { title: "Pack sizes and cart", text: "50 g, 100 g and 250 g options with add-to-cart from the product listing." },
      { title: "Interactive quality cards", text: "Flip cards that reveal grading, freshness, nutrition and packaging specifications." },
      { title: "Nutrients explorer", text: "Browse products by the nutrients they are rich in." },
      { title: "Mobile-first shopping", text: "A bottom navigation bar on phones for home, shop, search, wishlist and cart." },
      { title: "Gifting", text: "A dedicated gifting section for hampers and occasions." },
    ],
    scope: { heading: "Store sections", items: ["Home", "Our story", "Products", "Gifting", "Recipes and articles", "Contact", "Cart and wishlist"] },
    media: {
      cover: m("cashew-hero", "Whole cashew kernels spilling from an EarthOra kraft pouch", 1536, 1024),
      desktop: m("premium-cashew-ecommerce-desktop", "EarthOra store home page", 1440, 900),
      mobile: m("premium-cashew-ecommerce-mobile", "EarthOra store on a phone", 390, 844),
      gallery: [
        m("cashew-pouch", "A resealable EarthOra pouch of premium cashews", 1536, 1024),
        m("cashew-grading", "Graded cashew kernels arranged by size", 1536, 1024),
        m("cashew-orchard", "Golden-hour light in a single-estate cashew orchard", 1536, 1024),
        m("cashew-tandoori-pack", "EarthOra Tandoori Crunch packaging", 1099, 1099),
        m("cashew-packing", "Hands sealing a kraft pouch of graded cashews", 1448, 1086),
        m("cashew-gifting", "EarthOra gift hamper with cashews", 1536, 1024),
      ],
    },
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
