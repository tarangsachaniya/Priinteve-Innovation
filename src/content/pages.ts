import type { FaqItem, IconName } from "./types";

export const home = {
  seo: {
    title: "Priinteve Innovations | Print, Restaurant & Salon Software",
    description:
      "Priinteve builds Xerox Buddy, Vantadot, Salony and Nectcard, plus websites and custom software for Indian businesses. See what we make and get started.",
    keywords: "priinteve innovations, business software India, print restaurant salon software",
  },
  h1: "Software that helps Indian businesses print, serve and grow",
  lead: "Priinteve Innovations is an India-based product company. We build ready-to-use tools for print shops, restaurants, salons and professionals, and we design and develop websites and software for businesses like yours.",
  productsHeading: "Five products. One problem solved well by each.",
  howHeading: "Scan or tap. Use it. Manage it from one dashboard.",
  how: [
    { title: "Scan or tap", text: "Your customer scans a QR code or taps an NFC standee or card. A website opens right away. No app to install." },
    { title: "Use it", text: "They upload a file to print, order a meal, book a slot or save a contact." },
    { title: "Manage it", text: "You see everything in your dashboard and stay in control." },
  ],
  serve: [
    { icon: "printer", label: "Stationery and xerox shop owners", href: "/products/xerox-buddy", cta: "Explore Xerox Buddy", text: "Stationery, xerox and print shops that are busy at the counter" },
    { icon: "utensils", label: "Restaurant and cafe owners", href: "/products/vantadot", cta: "Explore Vantadot", text: "Restaurants and food businesses that want faster table service and takeaway" },
    { icon: "scissors", label: "Salon, barber and spa owners", href: "/products/salony", cta: "Explore Salony", text: "Salons, barbershops and spas that want a simple way to take appointments" },
    { icon: "card", label: "Professionals, shops, teams", href: "/products/nectcard", cta: "Explore Nectcard", text: "Shops, studios and professionals who want a modern digital identity" },
    { icon: "factory", label: "Businesses needing a website", href: "/services", cta: "Explore our services", text: "Manufacturers, wholesalers, marketing companies and e-commerce brands that need a strong website" },
  ] as { icon: IconName; label: string; href: string; cta: string; text: string }[],
  webHeading: "The team that runs our platforms builds yours",
  web: "We design and develop fast, modern websites, online stores and custom web applications. Recent projects include a digital marketing company website, a plywood wholesaler's trade catalogue, a premium cashew online store and an industrial machinery manufacturer's website.",
  why: [
    { icon: "puzzle", title: "Built by product people", text: "We run our own platforms, so we know what works in real businesses." },
    { icon: "handshake", title: "One partner, many solutions", text: "Print, digital identity, restaurant tools, salon booking and web development under one roof." },
    { icon: "rupee", title: "Made for India", text: "Rupee payments through Razorpay, regional settings and pricing that suits small businesses." },
    { icon: "shield", title: "Modern, reliable technology", text: "Next.js, React, TypeScript and PostgreSQL with secure hosting and file storage." },
    { icon: "sparkles", title: "Clear and simple", text: "Guided setup, honest pricing and support when you need it." },
  ] as { icon: IconName; title: string; text: string }[],
};

export const about = {
  seo: {
    title: "About Priinteve Innovations | Indian Product Company",
    description:
      "Priinteve Innovations is an India-based product and software company making print, digital identity and business tools simple and affordable.",
    keywords: "about priinteve, product company India, Indian software company",
  },
  h1: "About Priinteve Innovations",
  story: [
    "We started with one idea: ordering custom print should be as easy as ordering anything else online. That idea grew into a platform, and then into a small family of products and services.",
    "Today Priinteve Innovations builds Xerox Buddy for stationery and xerox shops, Vantadot for restaurants, Salony for salons and spas, Nectcard for digital business cards, and Priinteve Printing, our on-demand printing service. We also build websites and custom software for clients.",
  ],
  mission: "To make professional printing, digital identity and day-to-day business tools simple and affordable for small and growing businesses.",
  howWeWork: "We are a product company first. What we build for ourselves shapes what we deliver for clients. We run our own platforms, we see the same problems our customers see, and we fix them.",
  beliefs: [
    "Tools for small businesses should be simple enough to start using the same day.",
    "Customers should never have to install an app to order, print or book.",
    "Pricing should be honest and easy to understand.",
  ],
  team: "[Add founder or team names, photos, year founded and city if you want them shown. Not available in the current profile.]",
  cta: { heading: "Want to know more?", sub: "Talk to us at contact@priinteve.com or call +91 96620 70751." },
};

export const productsPage = {
  seo: {
    title: "Products | Xerox Buddy, Vantadot, Salony, Nectcard",
    description:
      "Explore Priinteve products: Xerox Buddy for print shops, Vantadot for restaurants, Salony for salons, Nectcard digital cards and Priinteve Printing.",
    keywords: "business software India, QR ordering, appointment booking, digital business card",
  },
  h1: "Products built for Indian businesses",
  intro: "Every Priinteve product solves one problem well, and most work by a simple scan or tap. Pick the one that fits your business.",
  help: [
    { label: "I run a print shop", href: "/products/xerox-buddy" },
    { label: "I run a restaurant", href: "/products/vantadot" },
    { label: "I run a salon", href: "/products/salony" },
    { label: "I need a business card", href: "/products/nectcard" },
    { label: "I need to print in bulk", href: "/products/priinteve-printing" },
    { label: "I need a website", href: "/services" },
  ],
};

export const servicesPage = {
  seo: {
    title: "Web Design & Development Services | Priinteve Innovations",
    description:
      "Priinteve designs and builds fast websites, e-commerce stores and custom web apps for Indian businesses. See our services and recent client work.",
    keywords: "web development company India, website design services, custom software development India",
  },
  h1: "Websites and software built by the team behind our own products",
  lead: "We run our own platforms, so we build with real business in mind. From a one-page site to a multi-user platform, we design and develop it for you.",
  included: {
    title: "Payments, email and notifications",
    text: "Secure online payments, transactional email and push notifications built in.",
    badge: "Included in every project",
  },
};

export const workPage = {
  seo: {
    title: "Our Work | Website Projects by Priinteve Innovations",
    description:
      "See websites we built for a digital marketing company, a plywood wholesaler, a premium cashew brand and an industrial machinery manufacturer.",
    keywords: "website portfolio India, web development projects, ecommerce portfolio, manufacturer website examples",
  },
  h1: "Websites we have built for clients",
  intro: "A look at recent websites we designed and developed. Each project starts with a business goal and ends with a site that does a job.",
  namingNote: "Add the client name and live link for the cashew brand and the machinery manufacturer only if the clients agree to be named.",
};

export const caseStudyTemplate = {
  built: "[Pages, features, and the visual or mobile approach.]",
  technology: ["Next.js", "React", "TypeScript", "PostgreSQL"],
  technologyNote: "[Confirm which of these apply to this project.]",
  outcome: "[Add real results, such as enquiries or launch date, only if known.]",
  liveSite: "[Add live site link and screenshots.]",
};

export const faqPage = {
  seo: {
    title: "FAQ | Priinteve Innovations Products and Services",
    description:
      "Answers about Priinteve Innovations: our products, how scan and tap works, pricing, support and website development services.",
    keywords: "priinteve faq, xerox buddy faq, vantadot faq, nectcard faq",
  },
  h1: "Frequently asked questions",
  note: "[Add pricing and support-hours answers once confirmed.]",
  items: [
    { q: "What does Priinteve Innovations do?", a: "We are an India-based product company. We make Xerox Buddy, Vantadot, Salony, Nectcard and Priinteve Printing, and we build websites and software for clients." },
    { q: "Do my customers need to download an app?", a: "No. Xerox Buddy, Vantadot, Salony and Nectcard all open in the phone browser after a scan or tap." },
    { q: "Which product is right for me?", a: "Print or stationery shop: Xerox Buddy. Restaurant: Vantadot. Salon, barbershop or spa: Salony. Business card: Nectcard. Bulk branded print: Priinteve Printing." },
    { q: "Do you build websites for other businesses?", a: "Yes. We design and develop websites, e-commerce stores and custom web applications." },
    { q: "Can I pay in rupees?", a: "Yes. Payments run through Razorpay." },
    { q: "How do I get started?", a: "Call +91 96620 70751 or write to contact@priinteve.com." },
  ] satisfies FaqItem[],
};

export const contactPage = {
  seo: {
    title: "Contact Priinteve Innovations | Call or Send an Enquiry",
    description:
      "Tell us what you want to print, build or launch. Call +91 96620 70751 or write to contact@priinteve.com and we will take it from there.",
    keywords: "contact priinteve, priinteve phone, priinteve email",
  },
  h1: "Contact Priinteve Innovations",
  next: "We read every enquiry, reply within [add your promised time], and suggest the right next step, whether that is a demo, a quote or a call.",
};

export const blogPage = {
  /** The plan gives no title/description for the blog index; these are neutral and derived from Part 3. */
  seo: {
    title: "Blog | Priinteve Innovations",
    description:
      "Guides on self-service printing, QR ordering, salon booking, digital business cards and websites for Indian businesses.",
    keywords: "priinteve blog",
  },
  h1: "Blog",
  intro: "Each article is 800 to 1,200 words, answers one question, and links to the matching product or service page.",
  clusters: [
    { cluster: "Print shops", linkLabel: "Xerox Buddy", href: "/products/xerox-buddy", ideas: ["How stationery shops can handle rush hour without hiring more staff", "How to let customers print from a QR code", "Self-service printing for xerox shops: a simple guide"] },
    { cluster: "Restaurants", linkLabel: "Vantadot", href: "/products/vantadot", ideas: ["How QR code table ordering works", "Takeaway ordering without a separate app", "What a kitchen display screen does for your chefs"] },
    { cluster: "Salons", linkLabel: "Salony", href: "/products/salony", ideas: ["How online booking helps salons and barbershops", "Running a salon appointment book without phone calls"] },
    { cluster: "Digital cards", linkLabel: "Nectcard", href: "/products/nectcard", ideas: ["NFC business card vs paper visiting card", "How to share your digital visiting card on WhatsApp", "NFC vs QR for business cards"] },
    { cluster: "Print", linkLabel: "Priinteve Printing", href: "/products/priinteve-printing", ideas: ["How to prepare a design for printing", "Ordering printed material in bulk for a small business"] },
    { cluster: "Web", linkLabel: "Services and Our Work", href: "/services", ideas: ["What a manufacturer's website needs to win trade buyers", "Mobile-first e-commerce basics for Indian brands", "Why your business needs a fast website"] },
  ],
};

export const legalPages = {
  "privacy-policy": { title: "Privacy Policy" },
  terms: { title: "Terms" },
} as const;
