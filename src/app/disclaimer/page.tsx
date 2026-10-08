import { LegalPage, legalMetadata } from "@/components/sections/legal-page";

export const metadata = legalMetadata("disclaimer");

export default function Page() {
  return <LegalPage slug="disclaimer" />;
}
