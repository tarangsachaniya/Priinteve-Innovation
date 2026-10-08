import { LegalPage, legalMetadata } from "@/components/sections/legal-page";

export const metadata = legalMetadata("privacy-policy");

export default function Page() {
  return <LegalPage slug="privacy-policy" />;
}
