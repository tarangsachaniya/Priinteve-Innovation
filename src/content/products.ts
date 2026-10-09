import type { Media, Product, ProductSlug } from "./types";

/*
 * Product content. Every feature, plan and FAQ answer below is taken from the product's own live website
 * (zerox.priinteve.com, menu.priinteve.com, salon.priinteve.com, cards.priinteve.com) as audited in
 * October 2026. Nothing here is a metric or a testimonial. Re-check prices against the live sites before
 * changing them; the live site is always the authority.
 */

const shot = (slug: string, view: "desktop" | "mobile" | "section", alt: string): Media =>
  view === "mobile"
    ? { src: `/media/products/${slug}-mobile.webp`, alt, width: 390, height: 844 }
    : { src: `/media/products/${slug}-${view}.webp`, alt, width: 1440, height: 900 };

export const products: Product[] = [
  {
    slug: "nectcard",
    name: "Nectcard",
    icon: "card",
    status: "Live",
    liveUrl: "https://cards.priinteve.com/",
    videoId: "buYUgO7zWEA",
    category: "NFC and QR digital business cards",
    seo: {
      title: "Nectcard | NFC Business Cards & Digital Visiting Cards",
      description:
        "One tap or scan opens your full digital profile: call, WhatsApp, email, website, gallery and save-to-contacts. Plastic, wooden and metal NFC cards with a QR backup.",
      keywords: "NFC business card, digital visiting card, QR business card, contactless business card India",
    },
    h1: "Nectcard: one card, every way to connect",
    hero: "Share your contact details, socials and portfolio with a single tap or scan, with no app required. Edit your profile any time and every card you've shared updates.",
    card: "NFC business cards with a QR backup that open a live, editable digital profile.",
    problem:
      "Paper cards get lost, go out of date and end up in the bin. Every change means a reprint, and you never know if anyone looked at your details.",
    how: [
      {
        heading: "Set up in minutes, share in a second",
        steps: true,
        items: [
          { title: "Sign up", text: "Sign up and choose a plan that fits how you network." },
          { title: "Build your card", text: "Add your details, links and gallery with the guided setup." },
          { title: "Share it", text: "Tap your NFC card or let someone scan your QR code, anywhere. The profile opens instantly." },
        ],
      },
    ],
    featuresHeading: "Everything a paper card can't do",
    features: [
      { title: "NFC tap", text: "Works with any NFC-enabled phone, with no app required. The profile opens directly in the browser." },
      { title: "QR backup", text: "Every card ships with a QR code, so phones that don't tap can scan." },
      { title: "Digital profile", text: "Photo, title, company and every way to reach you, live behind one link." },
      { title: "One-tap contact actions", text: "Save contact, call, WhatsApp, email and open your website straight from the profile." },
      { title: "Gallery", text: "Show your work with up to 20 gallery images and 5 videos, on every card plan." },
      { title: "Analytics", text: "See how your card is being viewed." },
      { title: "Custom profile", text: "Colours, fonts and layout that look like your brand." },
      { title: "Team management", text: "Keep every team member's card consistent, on-brand and instantly updatable." },
      { title: "Always current", text: "Edit once and every card you've ever shared shows the new details." },
    ],
    highlights: ["NFC tap", "QR backup", "No app needed", "Save contact", "WhatsApp", "Gallery", "Analytics", "Team plans"],
    pricing: {
      intro: "Choose a plastic, wooden or metal card on a 1, 2 or 3-year plan, with no monthly fee. Free shipping on every order.",
      plans: [
        { name: "Plastic", price: "₹499", period: "2-year plan", note: "Light, durable and everyday-ready.", items: ["Tap + QR scan", "20 gallery images", "5 videos", "Durable printed plastic card", "Full profile customisation"] },
        { name: "Wooden", price: "₹799", period: "2-year plan", featured: true, note: "Eco-friendly engraved finish.", items: ["Tap + QR scan", "20 gallery images", "5 videos", "Engraved wooden card", "Full profile customisation", "Priority support"] },
        { name: "Metal", price: "₹1,399", period: "2-year plan", note: "Premium laser-etched statement card.", items: ["Tap + QR scan", "20 gallery images", "5 videos", "Laser-etched metal card", "Full profile customisation", "Priority support", "Dedicated onboarding help"] },
      ],
      note: "2-year prices as listed on cards.priinteve.com; 1 and 3-year plans are also available there. The live site is the authority on current prices.",
    },
    who: "Professionals, founders, sales teams, real estate agents, clinics, retail and hospitality businesses, freelancers and creators.",
    audiences: ["Real estate", "Freelance & consulting", "Healthcare & clinics", "Retail & hospitality", "Corporate sales teams", "Creators & coaches"],
    faq: [
      { q: "Does the person receiving my card need an app?", a: "No. A tap or a scan opens your profile in their phone browser." },
      { q: "Can I update my card after publishing?", a: "Yes. Edit your profile once and every card you've ever shared shows the new details." },
      { q: "What if their phone doesn't support NFC?", a: "Every card has a QR code as a backup, so anyone can scan it." },
      { q: "Which card materials are available?", a: "Plastic, wooden and metal cards. Plans run for 1, 2 or 3 years with no monthly fee." },
      { q: "How long does delivery take?", a: "Shipping is free on every order and cards typically arrive within a week." },
      { q: "Is there a plan for teams?", a: "Yes. Team management keeps every card consistent and on-brand. Contact us for a custom team plan.", link: { label: "Get your card", href: "https://cards.priinteve.com/" } },
    ],
    cta: { heading: "The last business card you'll need.", sub: "One tap, every way to connect.", button: "Visit Nectcard", href: "https://cards.priinteve.com/" },
    related: "xerox-buddy",
    relatedServices: ["nfc-qr-solutions", "website-design-development"],
    mock: { title: "Your Nectcard", rows: [["Save contact", "Tap"], ["WhatsApp · Call · Email", "NFC"], ["QR backup", "Scan"]] },
    builtFor: "Professionals, shops and teams",
    howCustomersUse: "Tap the NFC card or scan its QR to open the profile",
    media: {
      desktop: shot("nectcard", "desktop", "Nectcard website: one card, every way to connect"),
      mobile: shot("nectcard", "mobile", "Nectcard on a phone"),
      section: shot("nectcard", "section", "Nectcard card templates for every kind of business"),
    },
  },
  {
    slug: "ventadot",
    name: "VentaDot",
    icon: "utensils",
    status: "Live",
    liveUrl: "https://menu.priinteve.com/",
    videoId: "WyNIzUqtJVY",
    category: "Table-side QR ordering for restaurants",
    seo: {
      title: "VentaDot | QR Table Ordering, Kitchen Display & GST Invoices",
      description:
        "Guests scan the table QR or tap NFC, order from their phone and pay. Orders land live on your kitchen display with GST-ready invoices. ₹0 Starter plan, 0% commission.",
      keywords: "QR table ordering, restaurant ordering system India, kitchen display system, GST invoice restaurant, NFC menu",
    },
    h1: "VentaDot: scan, order, pay, with zero commission",
    hero: "Guests scan the table QR, order from their phone and pay however they like. Every order lands live on your kitchen board, with GST invoices, reviews and rewards built in.",
    card: "Table-side QR and NFC ordering, a live kitchen display and GST-ready invoices, at 0% commission.",
    problem:
      "In a busy dining room guests wait to order, wait to ask for the bill, and paper KOTs get lost between floor and kitchen. Ordering apps that charge a commission on every order eat into margins.",
    how: [
      {
        heading: "From scan to served in four steps",
        steps: true,
        items: [
          { title: "Scan", text: "Guests tap the NFC tag or scan the table QR. Your live menu opens in the browser, already tied to that table. No app to install." },
          { title: "Order", text: "Photos, veg and non-veg marks, add-ons and bestseller tags. Guests build their own order without flagging anyone down." },
          { title: "Kitchen", text: "Every order lands on the kitchen board the moment it's placed and moves from new to preparing to ready, with a chime, a KOT print and a pickup board call-out." },
          { title: "Pay", text: "Pay online, at the counter or by your own UPI QR. Money goes straight to your account at 0% commission, and a GST-ready invoice is generated automatically." },
        ],
      },
    ],
    featuresHeading: "Everything service needs, in one place",
    features: [
      { title: "Table-side QR and NFC ordering", text: "A code for every table, generated in seconds, with live table status on the floor." },
      { title: "Live kitchen display", text: "Orders appear on one screen as new, preparing and ready. The pickup board calls out numbers on the counter TV." },
      { title: "A menu you control", text: "Add dishes, change prices and mark items out of stock. Changes are live on every guest's phone the moment you save." },
      { title: "GST-ready invoices", text: "Every order generates a tax invoice with GSTIN, FSSAI licence and a clean CGST and SGST breakdown." },
      { title: "UPI, card and cash", text: "Guests pay online, at the counter or by your own UPI QR." },
      { title: "Order tracking for guests", text: "Diners can follow their order status live." },
      { title: "Reviews", text: "Diners rate their order. Publish the reviews you want and keep the rest private." },
      { title: "Rewards and scratch cards", text: "Loyalty points and scratch-card promotions that bring guests back." },
      { title: "WhatsApp receipts", text: "The bill and PDF invoice can be sent on WhatsApp when the order is done." },
      { title: "Peak-hour smart menu", text: "Demote slow-to-make dishes during rush windows so the kitchen is not buried." },
      { title: "Multi-location", text: "Run every branch from one console, with menus, orders and sales side by side." },
      { title: "Analytics", text: "Orders, revenue, table activity and top-selling dishes in one overview." },
    ],
    highlights: ["QR ordering", "NFC ordering", "Kitchen display", "GST invoices", "UPI / card / cash", "Reviews", "Rewards", "WhatsApp receipts", "Multi-location"],
    pricing: {
      intro: "Start at ₹0 and keep 100% of every order. No per-order commissions.",
      plans: [
        { name: "Starter", price: "₹0", period: "free forever", note: "Single branch. Launch table-side QR ordering, kitchen routing and billing.", items: ["Unlimited table QR codes & digital menus", "Live kitchen display", "Instant menu editing & out-of-stock toggles", "UPI, card & cash payment support", "GST & FSSAI compliant invoices", "Live order tracking for diners", "Customer feedback & reviews"] },
        {
          name: "Growth & Multi-Branch",
          price: "Custom",
          period: "talk to us",
          featured: true,
          note: "For busy restaurants, breweries, food courts and multi-location groups.",
          items: ["Multi-branch management console", "Peak-hour analytics & kitchen speed reports", "Kitchen thermal printer sync", "WhatsApp bill & status dispatch", "Custom domain & white-label branding", "Staff roles and floor managers", "Dedicated onboarding"],
        },
      ],
      note: "Plans as listed on menu.priinteve.com. The live site is the authority on current plans.",
    },
    platforms: ["Owner app: Windows", "Owner app: macOS", "Owner app: Android", "Kitchen & pickup: Android", "Pickup screen: Android TV", "Guests: any phone browser"],
    who: "Cafés, fine dining, quick-service restaurants, rooftop bistros, food courts, bars and breweries, cloud kitchens, bakeries and multi-branch groups.",
    audiences: ["Cafés", "Fine dining", "Quick-service", "Food courts", "Bars & breweries", "Cloud kitchens", "Bakeries", "Multi-branch groups"],
    faq: [
      { q: "Do guests need to download an app or create an account?", a: "No. Guests tap the NFC tag or scan the table QR and the live menu opens in their browser, already tied to their table." },
      { q: "Do you take a commission on orders?", a: "No. VentaDot charges 0% commission. Payments go straight to your account, online, at the counter or through your own UPI QR." },
      { q: "Can we edit the menu, prices and photos in real time?", a: "Yes. Add dishes, change prices and mark items out of stock. Changes are live on every guest's phone as soon as you save." },
      { q: "Does VentaDot generate GST and FSSAI invoices?", a: "Yes. Every order produces a tax invoice with GSTIN, FSSAI licence and a CGST and SGST breakdown." },
      { q: "Which devices does it run on?", a: "Owner apps for Windows, macOS and Android, plus kitchen and pickup boards for Android tablets and Android TV. No proprietary hardware is needed." },
      { q: "How long does setup take?", a: "VentaDot is designed to be set up in a day, starting on the free Starter plan.", link: { label: "Start on menu.priinteve.com", href: "https://menu.priinteve.com/" } },
    ],
    cta: { heading: "Take your first QR order today.", sub: "₹0 to start and no per-order commissions.", button: "Visit VentaDot", href: "https://menu.priinteve.com/" },
    related: "salonly",
    relatedServices: ["nfc-qr-solutions", "whatsapp-bots"],
    mock: { title: "Live orders", rows: [["Table 14 · 2 items", "New"], ["Table 6 · Paneer tikka ×2", "Cooking"], ["Order #1425", "Ready"]] },
    builtFor: "Restaurants, cafés and food businesses",
    howCustomersUse: "Scan the table QR or tap NFC, order and pay",
    media: {
      desktop: shot("ventadot", "desktop", "VentaDot website: QR table ordering for restaurants"),
      mobile: shot("ventadot", "mobile", "VentaDot on a phone"),
      section: shot("ventadot", "section", "VentaDot: guest scans the table QR"),
    },
  },
  {
    slug: "xerox-buddy",
    name: "Xerox Buddy",
    icon: "printer",
    status: "Live",
    liveUrl: "https://zerox.priinteve.com/",
    videoId: "-YLwD_1jImg",
    category: "QR printing for xerox, print and cyber café shops",
    seo: {
      title: "Xerox Buddy | QR Printing Software for Xerox & Print Shops",
      description:
        "Customers scan your shop's QR and upload a PDF or photo. Xerox Buddy routes each job to the right printer, makes passport photo sheets and tracks sales. 7-day free trial.",
      keywords: "xerox shop software, QR printing, print shop management, passport photo sheet, smart printer routing",
    },
    h1: "Xerox Buddy: your xerox shop, now smarter",
    hero: "Accept documents through a QR code, send every job to the right printer automatically, create passport photo sheets, manage your print queue and track your sales, all from one simple system.",
    card: "QR document upload, smart printer routing, passport photo sheets and sales tracking for print shops.",
    problem:
      "Most jobs at a xerox counter are simple, yet each one still means a WhatsApp forward, a pen drive or an email download, then retyping copies and settings. When the queue grows, the counter slows down and customers wait.",
    how: [
      {
        heading: "Four steps, zero retyping",
        intro: "From a customer's phone to paper in under a minute. No WhatsApp forwards, no pen drives, no email downloads.",
        steps: true,
        items: [
          { title: "Display your QR", text: "Print your shop's QR poster from the dashboard and put it on the counter." },
          { title: "Customer uploads", text: "They scan, upload a PDF or photo, pick print options and get a specimen number. No app, no signup." },
          { title: "Xerox Buddy receives it", text: "The job arrives on your shop computer instantly, with pages, copies and price already worked out." },
          { title: "The right printer prints", text: "Black and white to the laser, colour to the colour printer, automatically, with nothing to retype." },
        ],
      },
    ],
    featuresHeading: "Built for the counter",
    features: [
      { title: "QR document upload", text: "Customers scan the counter QR and upload from their phone browser. No app and no signup for them." },
      { title: "Smart printer routing", text: "Every job goes to a printer that can actually print it: black and white or colour, A4 or A3. Busy or offline printers are skipped." },
      { title: "Passport photo sheets", text: "Customers upload one photo and you get a laid-out A4 sheet, sized to your printer's real printable area." },
      { title: "Print queue and specimen numbers", text: "Each job gets a specimen number so the right pages reach the right customer at the counter." },
      { title: "Sales tracking", text: "Every print is priced by your own rate card and recorded automatically: revenue, pages, black and white and colour, by day." },
      { title: "Printer monitoring", text: "See your connected printers and their status from the Xerox Buddy desktop app." },
      { title: "Private by default", text: "Documents are never public and are deleted once printed. Customer details are not collected." },
      { title: "Print preview", text: "Check a job before it prints, on the plan that includes preview." },
    ],
    highlights: ["Black & white", "Colour", "A4 and A3", "Double-sided", "PDF, JPG and PNG", "Passport photos", "Specimen numbers", "Smart routing"],
    pricing: {
      intro: "Every shop starts with 7 days free, no card needed. Then pick the plan that fits your counter.",
      plans: [
        { name: "Free", price: "₹0", period: "7-day trial", note: "Everything you need to start taking print jobs by QR.", items: ["1 printer", "QR document upload", "Black & white printing", "300 jobs / month", "Basic sales tracking", "Xerox Buddy Desktop"] },
        {
          name: "Prime",
          price: "₹299",
          period: "/ month",
          featured: true,
          note: "Colour, A3, passport photos, smart routing across two printers and full reports.",
          items: ["Up to 2 printers", "Black & white + colour", "Unlimited jobs", "Smart printer routing", "A4 and A3 paper", "Passport photo sheets", "Print preview", "Sales dashboard & reports", "Printer monitoring"],
        },
      ],
      note: "Prices as listed on zerox.priinteve.com. The live site is the authority on current plans.",
    },
    platforms: ["Customer side: any phone browser", "Shop side: Xerox Buddy Desktop"],
    who: "Xerox and photocopy shops, print shops, stationery stores with a print counter and cyber cafés.",
    audiences: ["Xerox and photocopy shops", "Print shops", "Stationery stores", "Cyber cafés", "Campus print counters"],
    faq: [
      { q: "Do my customers need to install an app?", a: "No. Customers scan your shop's QR code and upload from their phone browser. There is no app and no signup on their side." },
      { q: "Which files can customers upload?", a: "PDF, JPG and PNG files. Customers can also upload a single photo to create a passport photo sheet." },
      { q: "How does smart routing work?", a: "Each job is sent to a printer that can handle it: black and white or colour, A4 or A3. Printers that are busy or offline are skipped." },
      { q: "Is there a free trial?", a: "Yes. Every shop starts with a 7-day free trial and no card is needed. After that you choose a plan." },
      { q: "What happens to customer documents?", a: "Documents are never public and are deleted once printed. Xerox Buddy does not collect customer details." },
      { q: "Where do I sign up?", a: "On the Xerox Buddy website. Your shop's QR code is ready the moment you sign up.", link: { label: "zerox.priinteve.com", href: "https://zerox.priinteve.com/" } },
    ],
    cta: { heading: "Turn your xerox shop into a smarter print shop.", sub: "Start the 7-day free trial. Your QR code is ready the moment you sign up.", button: "Visit Xerox Buddy", href: "https://zerox.priinteve.com/" },
    related: "ventadot",
    relatedServices: ["nfc-qr-solutions", "custom-software"],
    mock: { title: "Print queue", rows: [["notes.pdf · 5 pages", "Printing"], ["passport-photo.jpg", "Queued"], ["Specimen #1042", "Ready"]] },
    builtFor: "Xerox, print and cyber café shops",
    howCustomersUse: "Scan the counter QR and upload a PDF or photo",
    media: {
      desktop: shot("xerox-buddy", "desktop", "Xerox Buddy website: QR printing for xerox and print shops"),
      mobile: shot("xerox-buddy", "mobile", "Xerox Buddy on a phone"),
      section: shot("xerox-buddy", "section", "Xerox Buddy: four steps from phone to paper"),
    },
  },
  {
    slug: "salonly",
    name: "Salonly",
    icon: "scissors",
    status: "Live",
    liveUrl: "https://salon.priinteve.com/",
    category: "Salon discovery and appointment booking",
    seo: {
      title: "Salonly | Salon Discovery & Online Appointment Booking",
      description:
        "Guests find a salon, pick a stylist and book a live slot with no sign-up. Salon owners get a shop page, team schedules, real reviews and a calm booking dashboard.",
      keywords: "salon booking app, salon appointment booking, barber booking, salon management software, salon listing",
    },
    h1: "Salonly: where every chair is booked beautifully",
    hero: "Find a salon you'll love, pick your person and grab a slot. No sign-up and no card for guests: they pay at the salon. Salon owners get a beautiful shop page, effortless booking and a back office that runs itself.",
    card: "Salon discovery and booking for guests, and a shop page, team schedules and booking dashboard for owners.",
    problem:
      "Salons lose time to phone bookings, double-bookings and no-shows, and guests can't see who is free or which stylist to choose. Reviews are often unverifiable.",
    how: [
      {
        heading: "Three steps for guests",
        steps: true,
        items: [
          { title: "Pick a salon", text: "Browse salons, their menus, their team and real reviews." },
          { title: "Grab a slot", text: "Choose a service, your stylist (or anyone free) and a time that's genuinely free." },
          { title: "Show up, glow up", text: "No account and no card. Pay at the salon, then leave a review if you like." },
        ],
      },
      {
        heading: "For salon owners",
        intro: "The Salonly team sets up your page, your team and your dashboard, then hands you the keys.",
        items: [
          "Your own shop page: menu, team, hours and reviews on one link you can share anywhere.",
          "Live slots per stylist, with clashes refused at the database level, so no double-bookings.",
          "Team schedules with hours, breaks and days off for everyone.",
          "Reviews only from guests with a completed visit. Reply or hide.",
          "Consent on every booking, and client data exported or deleted on request.",
          "A calm dashboard with today's diary, clients and services, easy to use one-handed.",
        ],
      },
    ],
    featuresHeading: "What Salonly does",
    features: [
      { title: "Salon discovery", text: "Guests browse salons by service: haircuts, colour, fades, facials, beards, styling and nails." },
      { title: "Online appointment booking", text: "Pick a service, a stylist or anyone free, and a live slot. No sign-up for guests." },
      { title: "Salon pages", text: "Each salon gets a shareable page with its menu, team, hours and reviews." },
      { title: "Team and stylist selection", text: "Guests choose the person they want, or the first available stylist." },
      { title: "Live appointment slots", text: "Slots are calculated per stylist and the system refuses a clash." },
      { title: "Owner dashboard", text: "Today's diary, clients, services and booking management in one place." },
      { title: "Team schedules", text: "Set hours, breaks and days off for each team member." },
      { title: "Verified reviews", text: "Only guests who completed a visit can leave a review." },
      { title: "Client management", text: "Client records with consent, export and deletion on request." },
    ],
    highlights: ["No sign-up for guests", "Pay at the salon", "Pick your stylist", "Never double-booked", "Real reviews"],
    pricing: {
      intro: "Salon owners choose the plan that suits them: a fixed monthly fee, or a small commission on completed bookings. Guests pay nothing to book.",
      plans: [],
      note: "Ask the Salonly team for current plan details when you list your salon.",
    },
    who: "Hair salons, unisex salons, barbershops, nail bars, beauty parlours and spas that take appointments.",
    audiences: ["Hair salons", "Barbershops", "Nail bars", "Beauty parlours", "Spas"],
    faq: [
      { q: "Do guests need an account to book?", a: "No. Guests pick a salon, a stylist and a slot without signing up." },
      { q: "Do guests pay online?", a: "No. Guests book without a card and pay at the salon." },
      { q: "How does a salon join?", a: "Send a request and the Salonly team sets up your page, team and dashboard so it's right from day one, then hands you the keys." },
      { q: "What does it cost a salon?", a: "Salons choose either a fixed monthly fee or a small commission on completed bookings." },
      { q: "What about my clients' data?", a: "Salonly records consent on every booking, and client data can be exported or deleted on request." },
      { q: "Can two guests book the same slot?", a: "No. Slots are live per stylist and the system refuses a clashing booking." },
    ],
    cta: { heading: "Own a salon? Let's get you listed.", sub: "The Salonly team sets everything up. You just say yes.", button: "Visit Salonly", href: "https://salon.priinteve.com/" },
    related: "nectcard",
    relatedServices: ["custom-software", "whatsapp-bots"],
    mock: { title: "Today's diary", rows: [["Haircut · 11:00", "Booked"], ["Colour · 12:30", "Booked"], ["Beard trim · 2:00", "New"]] },
    builtFor: "Salons, barbershops and spas",
    howCustomersUse: "Find a salon, pick a stylist and book a slot",
    media: {
      desktop: shot("salonly", "desktop", "Salonly website: book your good hair day"),
      mobile: shot("salonly", "mobile", "Salonly on a phone"),
      section: shot("salonly", "section", "Salonly: services and salons taking bookings"),
    },
  },
  {
    slug: "priinteve-printing",
    name: "Priinteve Printing",
    icon: "package",
    status: "Coming soon",
    category: "On-demand custom printing",
    seo: {
      title: "Priinteve Printing | Custom On-Demand Printing (Coming Soon)",
      description:
        "Upload your design, order custom print online and get it delivered. Priinteve Printing is coming soon, with vetted local printers and order tracking. Join the waitlist.",
      keywords: "custom printing online India, on-demand printing, bulk printing for business, printing delivered",
    },
    h1: "Priinteve Printing: print any thing, anywhere, on demand",
    hero: "Choose what you want to print, upload your design and place your order on web or mobile. Vetted local printers produce it and we deliver it to you.",
    card: "Custom print, produced by vetted local printers and delivered to you. Coming soon.",
    how: [
      {
        heading: "How it will work",
        steps: true,
        items: [
          { title: "Choose", text: "Choose what you want to print." },
          { title: "Upload", text: "Upload your design." },
          { title: "Order", text: "Place your order on web or mobile." },
          { title: "Produce", text: "A vetted local printer produces your order." },
          { title: "Track", text: "Track the order until it is delivered." },
        ],
      },
    ],
    featuresHeading: "Why it is different",
    features: [
      { title: "One consistent experience", text: "One brand and one experience, whichever printer makes your order." },
      { title: "Vetted local printers", text: "Printers are vetted so quality stays consistent." },
      { title: "Made for real quantities", text: "Built for businesses that need 25 to 1,000 pieces per order." },
      { title: "Order tracking", text: "Follow your order from placement to delivery." },
    ],
    highlights: ["Upload your design", "Vetted local printers", "25 to 1,000 pieces", "Order tracking", "Delivered to you"],
    who: "Businesses and individuals who need custom printed material in real quantities.",
    audiences: ["Small businesses", "Brands", "Event organisers", "Offices"],
    comingSoon: "Priinteve Printing is not live yet. Join the waitlist and we'll tell you first when it launches.",
    waitlistFields: ["Name", "Phone", "Email", "What you want to print", "Usual quantity"],
    faq: [
      { q: "When does it launch?", a: "We are preparing the launch. Join the waitlist and we'll tell you first." },
      { q: "What quantities can I order?", a: "Priinteve Printing is designed for 25 to 1,000 pieces per order." },
      { q: "Who prints my order?", a: "A vetted local printer, under one consistent Priinteve experience." },
      { q: "Can I print a single page today?", a: "For single documents at a shop near you, see Xerox Buddy.", link: { label: "Xerox Buddy", href: "/products/xerox-buddy" } },
    ],
    cta: { heading: "Join the waitlist.", sub: "We'll tell you first when Priinteve Printing launches.", button: "Join the waitlist", href: "#waitlist" },
    related: "xerox-buddy",
    relatedServices: ["ecommerce-websites", "custom-software"],
    mock: { title: "Order tracking", rows: [["Upload your design", "Step 1"], ["Local printer produces", "Step 2"], ["Delivered to you", "Step 3"]] },
    builtFor: "Businesses and individuals needing print",
    howCustomersUse: "Upload a design, order, get it delivered",
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getProduct = (slug: ProductSlug) => products.find((p) => p.slug === slug)!;
