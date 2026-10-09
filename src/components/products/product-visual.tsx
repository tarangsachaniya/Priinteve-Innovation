import type { Product, Service } from "@/content/types";
import { DeviceDuo } from "../ui/media";
import { SpecPanel } from "../ui/spec-panel";

export const hostOf = (url?: string) => (url ? new URL(url).host.replace(/^www\./, "") : undefined);

/**
 * Product hero visual: the real product website (desktop + phone screenshots). Products without a live
 * site (Priinteve Printing) get a flat spec panel built from the product's own mock-up copy.
 */
export function ProductVisual({ product }: { product: Product }) {
  if (product.media)
    return (
      <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
        <DeviceDuo desktop={product.media.desktop} mobile={product.media.mobile} url={hostOf(product.liveUrl)} priority />
      </div>
    );
  return (
    <div className="mx-auto w-full max-w-md lg:max-w-none">
      <SpecPanel kicker={product.category} status="Coming soon" icon={product.icon} title={product.name} sub={product.mock.title} rows={product.mock.rows.map(([title, line]) => ({ title, line }))} />
    </div>
  );
}

export function ServiceVisual({ service }: { service: Service }) {
  return (
    <div className="mx-auto w-full max-w-md lg:max-w-none">
      <SpecPanel kicker="What we build" icon={service.icon} title={service.short ?? service.name} sub={service.card} rows={service.includes.map((title) => ({ title }))} />
    </div>
  );
}
