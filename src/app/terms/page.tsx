import { LegalPage } from "@/components/sections/legal-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata("/terms", {
    title: "Terms | Priinteve Innovations",
    description: "Terms of use for Priinteve Innovations.",
  }),
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LegalPage title="Terms" path="/terms" />;
}
