import { LegalPage } from "@/components/sections/legal-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata("/privacy-policy", {
    title: "Privacy Policy | Priinteve Innovations",
    description: "Privacy Policy for Priinteve Innovations.",
  }),
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LegalPage title="Privacy Policy" path="/privacy-policy" />;
}
