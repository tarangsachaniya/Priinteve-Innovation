import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ComingSoonDock } from "@/components/layout/coming-soon-dock";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Preloader } from "@/components/layout/preloader";
import { SmoothScroll } from "@/components/motion/lenis";
import { site } from "@/content/site";
import "./globals.css";

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, locale: site.locale, type: "website" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f2" },
    { media: "(prefers-color-scheme: dark)", color: "#faf8f2" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Runs before first paint so the saved (or OS) theme is applied without a flash.
const THEME_SCRIPT =
  "(function(){try{var t=localStorage.getItem('priinteve-theme');if(t!=='dark')t='light';document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})()";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-theme="light" suppressHydrationWarning className={`${grotesk.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        {/* Reveals start hidden and the intro covers the page; without JS keep everything visible. */}
        <noscript>
          <style>{`[style*="opacity: 0"]{opacity:1!important;transform:none!important;filter:none!important}#preloader{display:none!important}[data-line]>span{transform:none!important}`}</style>
        </noscript>
        <a href="#main" className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-accent px-5 py-2.5 font-semibold text-on-accent transition-transform focus:translate-y-0">
          Skip to content
        </a>
        <Preloader />
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ComingSoonDock />
      </body>
    </html>
  );
}
