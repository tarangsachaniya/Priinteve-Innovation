import type { Block } from "./blocks";
import { BUSINESS_TBC as TBC, site } from "./site";

/*
 * LEGAL COPY: DEVELOPER NOTE (needs final legal/business review before publishing)
 * ---------------------------------------------------------------------------------
 * This copy is a website-ready draft based on how the business actually operates. It is not legal advice and
 * has not been reviewed by a lawyer. Items marked TBC render as a visible "[BUSINESS INFORMATION TO BE CONFIRMED]"
 * chip and must be confirmed:
 *   - Registered office address: confirmed (see site.registeredAddress). LLPIN still to confirm. Details published on Priinteve's own product sites (cards.priinteve.com
 *     footer and the Salonly footer, October 2026) show "LLPIN: ADC-7224 | GSTIN: In process" and
 *     "416, Mukhi ne Khadki, Near Ambe Maa Temple, Paldi Gam, Paldi, Ahmedabad, Gujarat 380007". Confirm these,
 *     then replace the TBC markers below.
 *   - GSTIN (shown as "in process" on the cards site).
 *   - Designated Grievance Officer name and response timelines.
 *   - Governing law / jurisdiction clause.
 *   - Whether any analytics or marketing cookies will be added (the site currently sets none).
 * Product-specific policies on each product's own website (VentaDot, Xerox Buddy, Salonly, Nectcard) take
 * precedence for those products.
 */

export const LEGAL_UPDATED = "2026-10-08";

export type LegalSection = { id: string; heading: string; body: Block[] };
export type LegalPage = { slug: string; title: string; description: string; intro: string; sections: LegalSection[] };

const contactBlock: Block[] = [
  { ul: [`${site.name}`, `Location: ${site.location.line}`, `Registered office address: ${site.registeredAddress.line}`, `Email: ${site.email}`, `Phone: ${site.phone}`] },
];

export const legalPages: LegalPage[] = [
  /* ------------------------------------------------------------------ Privacy */
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "How Priinteve Innovations LLP collects, uses, stores and protects personal information on priinteve.com and when you contact us.",
    intro: `This Privacy Policy explains how ${site.name} ("Priinteve", "we", "us") handles personal information when you visit priinteve.com, contact us or enquire about our products and services. Each Priinteve product (Nectcard, VentaDot, Xerox Buddy and Salonly) has its own website and its own privacy policy, which applies when you use that product.`,
    sections: [
      { id: "information-we-collect", heading: "1. Information we collect", body: [
        { p: "We collect only the information we need to respond to you and to run this website:" },
        { ul: [
          "Contact and enquiry details you give us: your name, email address, phone number, business name and the content of your message.",
          "Waitlist details for Priinteve Printing: name, phone, email, what you want to print and your usual quantity.",
          "Account information, where you create an account on one of our product websites. That information is handled under the product's own privacy policy.",
          "Communication records: emails, calls and messages exchanged with us about an enquiry or project.",
          "Basic technical information that any web server receives, such as IP address, browser type and the pages requested, which our hosting provider may log for security and reliability.",
        ] },
      ] },
      { id: "contact-forms", heading: "2. Contact forms on this website", body: [
        { p: "The enquiry and waitlist forms on this website do not currently send data to a server. When you complete a form, it prepares an email in your own email app addressed to us. Nothing is transmitted until you send that email yourself. If we connect the forms to an online service in future, we will update this policy." },
      ] },
      { id: "how-we-use", heading: "3. How we use information", body: [
        { ul: [
          "To reply to your enquiry and discuss your requirements",
          "To prepare proposals and deliver the products or services you ask for",
          "To tell you when Priinteve Printing launches, if you joined the waitlist",
          "To keep this website secure and working properly",
          "To meet legal, tax and accounting obligations",
        ] },
        { p: "We do not sell your personal information, and we do not use it for advertising profiles." },
      ] },
      { id: "cookies", heading: "4. Cookies and browser storage", body: [
        { p: "This website does not currently set analytics or marketing cookies. It uses your browser's local storage to remember your light or dark theme choice and your cookie consent choice, and session storage to skip the opening animation after your first visit. On your first visit a consent banner lets you choose which optional categories to allow. See our Cookie Policy for details." },
      ] },
      { id: "analytics", heading: "5. Analytics", body: [
        { p: "We do not currently run analytics tools on this website. If we add analytics in future, we will update this policy and the Cookie Policy, and ask for consent where required." },
      ] },
      { id: "third-parties", heading: "6. Third-party services", body: [
        { p: "Some features rely on third-party providers:" },
        { ul: [
          "Hosting and infrastructure providers that serve this website.",
          "YouTube (in privacy-enhanced mode), which loads only when you choose to play a product video. YouTube's own privacy policy applies to the video player.",
          "Email and messaging services you use to contact us.",
          "Links to our product websites and client websites, which are governed by their own policies.",
        ] },
      ] },
      { id: "payments", heading: "7. Payment information", body: [
        { p: "This website does not take payments. Where you pay for a Priinteve product or service, payment is processed by the payment provider used for that product or invoice. We do not store full card details." },
      ] },
      { id: "retention", heading: "8. Data retention", body: [
        { p: "We keep enquiry and project communication for as long as needed to respond to you, deliver work and meet legal, tax and accounting obligations. Waitlist details are kept until the launch announcement is sent or until you ask us to remove them." },
      ] },
      { id: "security", heading: "9. Security", body: [
        { p: "We use reasonable technical and organisational measures to protect personal information, including access controls and secure hosting. No method of transmission or storage is completely secure, so we cannot guarantee absolute security." },
      ] },
      { id: "your-rights", heading: "10. Your rights", body: [
        { p: "Subject to applicable law, you can ask us to:" },
        { ul: ["Tell you what personal information we hold about you", "Correct inaccurate or incomplete information", "Delete your information", "Stop contacting you"] },
      ] },
      { id: "deletion", heading: "11. Data deletion requests", body: [
        { p: `To request access, correction or deletion, email ${site.email} with the subject "Data request" and the email address or phone number you used with us. We may need to verify your identity before acting on a request. For data held within a Priinteve product, contact that product's support channel or write to us.` },
      ] },
      { id: "children", heading: "12. Children's privacy", body: [
        { p: "This website and our services are intended for businesses and adults. We do not knowingly collect personal information from children. If you believe a child has provided us with information, contact us and we will delete it." },
      ] },
      { id: "updates", heading: "13. Changes to this policy", body: [
        { p: "We may update this policy as our website and services change. The date at the top of this page shows when it was last updated." },
      ] },
      { id: "contact", heading: "14. Contact", body: [{ p: "Questions about this policy or your information:" }, ...contactBlock, { p: "See also our Grievance Redressal page." }] },
    ],
  },

  /* ------------------------------------------------------------------ Terms */
  {
    slug: "terms",
    title: "Terms & Conditions",
    description: "Terms and conditions for using priinteve.com and engaging Priinteve Innovations LLP for products and services.",
    intro: `These Terms & Conditions govern your use of priinteve.com, operated by ${site.name}. By using this website you agree to these terms. Each Priinteve product has its own terms on its own website, and project work is governed by the proposal or agreement for that project.`,
    sections: [
      { id: "website-use", heading: "1. Using this website", body: [
        { p: "You may browse and use this website for lawful purposes. You must not attempt to disrupt the website, access it in unauthorised ways, scrape it at scale, or use it to send unlawful or harmful content." },
      ] },
      { id: "services", heading: "2. Our services", body: [
        { p: "This website describes the digital solutions we provide, including website and web development, e-commerce, custom software, CRM and ERP, NFC and QR solutions, bots, AI agents and automation. Descriptions are general. The scope, deliverables, timelines, fees and responsibilities for any project are set out in a written proposal or agreement, which takes precedence over this website." },
      ] },
      { id: "products", heading: "3. Product information", body: [
        { p: "Information about Nectcard, VentaDot, Xerox Buddy, Salonly and Priinteve Printing is provided for general information. Features, plans and prices can change. The product's own website and terms are the authority for current features, plans, prices and conditions of use. Priinteve Printing is not yet available." },
      ] },
      { id: "responsibilities", heading: "4. Your responsibilities", body: [
        { ul: [
          "Provide accurate information when you contact us or engage our services",
          "Have the rights to any content, images, trademarks or data you provide to us for a project",
          "Keep any login details for our products secure",
          "Use our products and deliverables lawfully",
        ] },
      ] },
      { id: "accounts", heading: "5. Accounts", body: [
        { p: "This website does not offer user accounts. Accounts for our products are created on the product websites and are governed by their terms." },
      ] },
      { id: "payments", heading: "6. Payments", body: [
        { p: "This website does not accept payments. Fees for projects are set out in the relevant proposal or agreement. Fees for products are set out on the product's website. Applicable taxes are charged as required by law." },
      ] },
      { id: "ip", heading: "7. Intellectual property", body: [
        { p: `The content, design, logos and code of this website belong to ${site.name} or its licensors. Product names (Nectcard, VentaDot, Xerox Buddy, Salonly, Priinteve Printing) and the Priinteve logo are our brand identifiers. Client names, websites and imagery shown in Our Work belong to their respective owners and are shown to describe work we did. Ownership of project deliverables is agreed in each project agreement.` },
      ] },
      { id: "third-party-links", heading: "8. Third-party links", body: [
        { p: "This website links to our product websites, client websites and third-party services such as YouTube. We are not responsible for the content or practices of third-party websites." },
      ] },
      { id: "availability", heading: "9. Availability", body: [
        { p: "We aim to keep this website available but do not guarantee uninterrupted access. We may change, suspend or remove any part of it at any time." },
      ] },
      { id: "warranties", heading: "10. Disclaimers", body: [
        { p: "This website is provided \"as is\". To the extent permitted by law, we make no warranties about its completeness, accuracy or fitness for a particular purpose. See our Disclaimer for more." },
      ] },
      { id: "liability", heading: "11. Limitation of liability", body: [
        { p: "To the extent permitted by law, Priinteve is not liable for indirect or consequential loss arising from your use of this website. Liability for products and project work is governed by the product's terms or the project agreement." },
      ] },
      { id: "termination", heading: "12. Termination", body: [
        { p: "We may restrict access to this website for anyone who breaches these terms. Termination of product subscriptions and project engagements is governed by their own terms." },
      ] },
      { id: "law", heading: "13. Governing law", body: [
        { p: `These terms are governed by the laws of India. Jurisdiction and dispute resolution: ${TBC}` },
      ] },
      { id: "changes", heading: "14. Changes", body: [{ p: "We may update these terms. The date at the top of this page shows when they were last updated." }] },
      { id: "contact", heading: "15. Contact", body: contactBlock },
    ],
  },

  /* ------------------------------------------------------------------ Cookies */
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    description: "Which cookies and browser storage priinteve.com uses, and how you can control them.",
    intro: "This Cookie Policy explains what cookies are, what this website currently stores in your browser, and how you can control it.",
    sections: [
      { id: "what-are-cookies", heading: "1. What cookies are", body: [
        { p: "Cookies are small text files a website stores in your browser. Similar technologies, such as local storage and session storage, store small pieces of information in your browser in a similar way." },
      ] },
      { id: "what-we-use", heading: "2. What this website uses today", body: [
        { p: "This website does not currently set any analytics, advertising or marketing cookies. It uses browser storage only for the following:" },
        { ul: [
          "Theme preference (local storage, key \"priinteve-theme\"): remembers whether you chose the light or dark theme.",
          "Intro animation (session storage, key \"priinteve-intro-seen\"): skips the opening animation for the rest of your visit. It is cleared when you close the tab.",
          "Consent choice (local storage, key \"priinteve-consent\"): remembers which optional categories you allowed in the cookie banner, and when.",
        ] },
      ] },
      { id: "categories", heading: "3. Cookie categories", body: [
        { ul: [
          "Necessary: needed for the website to work and to keep it secure. Our hosting provider may use strictly necessary technical cookies or logs for security and performance.",
          "Necessary storage also covers your theme choice, the intro animation and your consent choice. It is always on.",
          "Media: allows embedded YouTube product videos to load. Off until you allow it in the banner or when you press play.",
          "Analytics: help us understand how the website is used. Not used at present, and off until you allow it.",
          "Marketing: used to personalise advertising. Not used."
        ] },
      ] },
      { id: "third-party", heading: "4. Third-party cookies", body: [
        { p: "Product videos are embedded from YouTube in privacy-enhanced mode and load only when you click to play. Once you play a video, YouTube may set its own cookies under its own policy. Our product websites (VentaDot, Xerox Buddy, Salonly, Nectcard) have their own cookie policies and consent controls." },
      ] },
      { id: "control", heading: "5. Managing cookies and storage", body: [
        { p: "You can delete or block cookies and site data in your browser settings at any time. Clearing site data for priinteve.com resets your theme choice. Blocking storage does not stop the website from working." },
        { p: "On your first visit a cookie banner asks for your choice. You can accept all, reject everything that isn't necessary, or choose category by category. You can change your choice at any time with the \"Cookie settings\" button in the website footer." },
      ] },
      { id: "contact", heading: "6. Contact", body: contactBlock },
    ],
  },

  /* ------------------------------------------------------------------ Refunds */
  {
    slug: "refund-policy",
    title: "Refund & Cancellation Policy",
    description: "How cancellations and refunds work for Priinteve products, subscriptions and custom development work.",
    intro: "This policy explains our general approach to cancellations and refunds. Because our products and services differ, the specific terms for a product or project always govern. This page does not set fixed refund periods or percentages.",
    sections: [
      { id: "product-terms", heading: "1. Product-specific policies come first", body: [
        { p: "Each Priinteve product publishes its own plans and policies on its website. If you buy or subscribe to a product, the cancellation and refund terms on that product's website apply:" },
        { ul: ["Xerox Buddy: zerox.priinteve.com", "VentaDot: menu.priinteve.com", "Salonly: the Salonly website", "Nectcard: cards.priinteve.com"] },
      ] },
      { id: "subscriptions", heading: "2. Subscriptions", body: [
        { p: "Where a product is sold as a subscription, you can stop renewal as described in that product's terms. Access normally continues until the end of the period already paid for. Refunds for partly used periods depend on the product's terms." },
      ] },
      { id: "physical", heading: "3. Physical products", body: [
        { p: "For physical items such as NFC cards, eligibility for replacement or refund (for example, for an item damaged in transit or a printing error on our part) is set out in the product's terms. Personalised items made to your specification may not be returnable once produced." },
      ] },
      { id: "custom-work", heading: "4. Custom development and digital services", body: [
        { p: "Websites, software, automation and other project work are custom work done for you. Payment milestones, cancellation terms and what happens to work completed so far are set out in the proposal or agreement for that project." },
        { p: "As a general principle, work that has already been carried out at the time of cancellation is chargeable and is not refundable, because it has been produced specifically for you." },
      ] },
      { id: "third-party-costs", heading: "5. Third-party costs", body: [
        { p: "Costs paid to third parties on your behalf, such as domain registration, hosting, app store fees, WhatsApp Business Platform charges or AI usage fees, are governed by those providers' policies and are usually not refundable by us." },
      ] },
      { id: "how-to", heading: "6. How to request a cancellation or refund", body: [
        { ol: [
          `Email ${site.email} with the subject "Cancellation" or "Refund request".`,
          "Include the product or project name, the account or invoice details, and the reason for your request.",
          "We will review the request against the applicable terms and reply with the outcome and next steps.",
        ] },
        { p: `Approved refunds are made to the original payment method. Processing timelines: ${TBC}` },
      ] },
      { id: "contact", heading: "7. Contact", body: contactBlock },
    ],
  },

  /* ------------------------------------------------------------------ Disclaimer */
  {
    slug: "disclaimer",
    title: "Disclaimer",
    description: "General disclaimer for information on priinteve.com, including product availability, pricing, third-party links and results.",
    intro: `The information on priinteve.com is published by ${site.name} for general information about our company, products and services.`,
    sections: [
      { id: "general", heading: "1. General information", body: [
        { p: "Content on this website is general information. It is not professional, legal, financial or tax advice. Consider your own circumstances and take appropriate advice before acting on it." },
      ] },
      { id: "accuracy", heading: "2. Accuracy of content", body: [
        { p: "We work to keep information accurate and current, but we do not guarantee that everything on this website is complete, accurate or up to date at all times." },
      ] },
      { id: "availability", heading: "3. Product and service availability", body: [
        { p: "Products, features and services described on this website may change, and some may not be available everywhere. Priinteve Printing is not yet available." },
      ] },
      { id: "pricing", heading: "4. Pricing", body: [
        { p: "Prices shown on this website are taken from the product websites and may change without notice. The price on the product's own website, or in your written proposal, is the one that applies." },
      ] },
      { id: "technical", heading: "5. Technical availability", body: [
        { p: "Websites and online services can be interrupted by maintenance, outages or factors outside our control. We do not guarantee uninterrupted availability of this website." },
      ] },
      { id: "results", heading: "6. No guarantee of business results", body: [
        { p: "Our products and services are designed to help businesses operate more efficiently, but results depend on many factors outside our control. We do not guarantee specific outcomes such as revenue, leads, rankings or savings." },
      ] },
      { id: "ai", heading: "7. AI-powered features", body: [
        { p: "AI systems can produce incorrect or incomplete output. AI features and agents we build are scoped and tested, but their output should be reviewed where accuracy matters." },
      ] },
      { id: "links", heading: "8. Third-party links and external services", body: [
        { p: "This website links to our product websites, client websites and third-party services. Client websites shown in Our Work are owned and operated by those clients. We are not responsible for the content, availability or practices of external websites and services." },
      ] },
      { id: "contact", heading: "9. Contact", body: contactBlock },
    ],
  },

  /* ------------------------------------------------------------------ Accessibility */
  {
    slug: "accessibility",
    title: "Accessibility Statement",
    description: "Priinteve's commitment to an accessible website: keyboard navigation, readable contrast, reduced motion and responsive design.",
    intro: "We want priinteve.com to be usable by as many people as possible, including people who use assistive technology, navigate by keyboard or prefer less motion.",
    sections: [
      { id: "approach", heading: "1. What we aim for", body: [
        { p: "This website is built to support:" },
        { ul: [
          "Keyboard navigation: menus, tabs, accordions and forms can be used without a mouse, with visible focus indicators and a skip-to-content link.",
          "Readable contrast between text and backgrounds in both light and dark themes.",
          "Semantic structure: headings, landmarks, lists and labels that assistive technology can interpret.",
          "Reduced motion: if your device is set to reduce motion, animations, scroll effects and 3D scenes are simplified or switched off.",
          "Responsive design that works on phones, tablets and desktops, and when zoomed.",
          "Accessible forms with labels, clear error messages and announcements for screen readers.",
          "Text alternatives for meaningful images; decorative images are hidden from screen readers.",
        ] },
      ] },
      { id: "status", heading: "2. Current status", body: [
        { p: "We follow recognised accessibility practices while designing and building, but we have not had this website independently audited or certified against a standard such as WCAG. Some content, such as screenshots of our product websites and embedded videos, may not be fully accessible." },
      ] },
      { id: "products", heading: "3. Our product websites", body: [
        { p: "Each Priinteve product has its own website. This statement covers priinteve.com. Accessibility feedback about a product is still welcome through the contact details below." },
      ] },
      { id: "feedback", heading: "4. Feedback and help", body: [
        { p: `If you find a part of this website difficult to use, or need information in a different format, email ${site.email} or call ${site.phone}. Tell us the page and the problem, and we'll work to fix it or provide the information another way.` },
      ] },
    ],
  },

  /* ------------------------------------------------------------------ Grievance */
  {
    slug: "grievance-redressal",
    title: "Grievance Redressal",
    description: "How to raise a complaint or grievance with Priinteve Innovations LLP about our website, products or services.",
    intro: "If you have a complaint about this website, our products or our services, or about how we have handled your information, you can raise it with us using the details below.",
    sections: [
      { id: "contact-details", heading: "1. Grievance contact", body: [
        { ul: [
          `Company: ${site.name}`,
          `Location: ${site.location.line}`,
          `Email: ${site.email}`,
          `Phone: ${site.phone}`,
          `Grievance contact details / designated officer: ${TBC}`,
        ] },
      ] },
      { id: "how-to", heading: "2. How to raise a grievance", body: [
        { ol: [
          `Email ${site.email} with the subject "Grievance".`,
          "Describe the issue, including the product, service or page concerned, relevant dates, and any order, account or invoice reference.",
          "Attach screenshots or documents that help explain the issue.",
          "Tell us how you would like the issue resolved.",
        ] },
      ] },
      { id: "what-happens", heading: "3. What happens next", body: [
        { p: `We will acknowledge your grievance, review it and respond with our findings and any action we will take. Acknowledgement and resolution timelines: ${TBC}` },
      ] },
      { id: "products", heading: "4. Product-specific grievances", body: [
        { p: "Some Priinteve products publish their own grievance contact on their websites. You can use either the product's grievance channel or the contact details on this page." },
      ] },
    ],
  },
];

export const legalBySlug = (slug: string) => legalPages.find((p) => p.slug === slug);
