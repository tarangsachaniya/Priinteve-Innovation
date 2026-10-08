import { LegalPage, legalMetadata } from "@/components/sections/legal-page";

export const metadata = legalMetadata("cookie-policy");

export default function Page() {
  return <LegalPage slug="cookie-policy" />;
}
