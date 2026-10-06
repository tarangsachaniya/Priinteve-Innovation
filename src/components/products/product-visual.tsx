import type { Product, Service } from "@/content/types";
import { Arch } from "../ui/arch";
import { Product3D } from "../three/scenes";
import type { ObjectVariant } from "../three/object-canvas";

const PRODUCT_VARIANT: Record<Product["slug"], ObjectVariant> = {
  "xerox-buddy": "sheets",
  vantadot: "tables",
  salony: "slots",
  nectcard: "card",
  "priinteve-printing": "boxes",
};

const SERVICE_VARIANT: Record<Service["slug"], ObjectVariant> = {
  "website-design-development": "layers",
  "ecommerce-websites": "orbit",
  "custom-web-applications": "network",
  "nfc-qr-solutions": "rings",
};

/** Arch window with the product's procedural 3D object; captioned as illustrative. */
export function ProductVisual({ product }: { product: Product }) {
  return (
    <figure className="mx-auto w-full max-w-md lg:max-w-none">
      <Arch className="mx-auto aspect-[3/4] w-full bg-surface/70 lg:max-w-[26rem]">
        <Product3D variant={PRODUCT_VARIANT[product.slug]} className="absolute inset-0" />
      </Arch>
      <figcaption className="label mt-4 text-center text-fg/60">{product.mock.title} — illustrative</figcaption>
    </figure>
  );
}

export function ServiceVisual({ service }: { service: Service }) {
  return (
    <div className="mx-auto w-full max-w-md lg:max-w-none">
      <Arch className="mx-auto aspect-[3/4] w-full bg-surface/70 lg:max-w-[26rem]">
        <Product3D variant={SERVICE_VARIANT[service.slug]} className="absolute inset-0" />
      </Arch>
    </div>
  );
}
