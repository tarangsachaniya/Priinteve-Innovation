import type { Product, Service } from "@/content/types";
import { Arch } from "../ui/arch";
import { DeviceDuo } from "../ui/media";
import { Product3D } from "../three/scenes";
import type { ObjectVariant } from "../three/object-canvas";

export const PRODUCT_VARIANT: Record<Product["slug"], ObjectVariant> = {
  "xerox-buddy": "sheets",
  ventadot: "tables",
  salonly: "slots",
  nectcard: "card",
  "priinteve-printing": "boxes",
};

export const SERVICE_VARIANT: Record<Service["slug"], ObjectVariant> = {
  "website-design-development": "layers",
  "ecommerce-websites": "orbit",
  "custom-web-applications": "network",
  "whatsapp-catalog": "orbit",
  "custom-software": "boxes",
  "crm-erp": "slots",
  "nfc-qr-solutions": "rings",
  "whatsapp-bots": "chat",
  "telegram-bots": "relay",
  "ai-agents": "agent",
  "business-automation": "flow",
  "ai-integrations": "plug",
};

export const hostOf = (url?: string) => (url ? new URL(url).host.replace(/^www\./, "") : undefined);

/**
 * Product hero visual: the real product website (desktop + phone screenshots) over the product's 3D
 * object. Products without a live site (Priinteve Printing) show the 3D object alone.
 */
export function ProductVisual({ product }: { product: Product }) {
  if (product.media)
    return (
      <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
        <div aria-hidden="true" className="absolute -inset-10 -z-10 opacity-60">
          <Product3D variant={PRODUCT_VARIANT[product.slug]} className="absolute inset-0" />
        </div>
        <DeviceDuo desktop={product.media.desktop} mobile={product.media.mobile} url={hostOf(product.liveUrl)} priority />
      </div>
    );
  return (
    <figure className="mx-auto w-full max-w-md lg:max-w-none">
      <Arch className="mx-auto aspect-[4/3] w-full lg:aspect-square">
        <Product3D variant={PRODUCT_VARIANT[product.slug]} className="absolute inset-0" />
      </Arch>
      <figcaption className="label mt-4 text-center text-fg/60">{product.mock.title} · coming soon</figcaption>
    </figure>
  );
}

export function ServiceVisual({ service }: { service: Service }) {
  return (
    <div className="mx-auto w-full max-w-md lg:max-w-none">
      <Arch className="mx-auto aspect-[4/3] w-full lg:aspect-square">
        <Product3D variant={SERVICE_VARIANT[service.slug]} className="absolute inset-0" />
      </Arch>
    </div>
  );
}
