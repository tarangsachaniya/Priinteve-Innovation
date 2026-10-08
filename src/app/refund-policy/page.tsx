import { LegalPage, legalMetadata } from "@/components/sections/legal-page";

export const metadata = legalMetadata("refund-policy");

export default function Page() {
  return <LegalPage slug="refund-policy" />;
}
