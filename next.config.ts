import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // renamed products and replaced portfolio entries keep their old URLs working
  async redirects() {
    return [
      { source: "/products/vantadot", destination: "/products/ventadot", permanent: true },
      { source: "/products/salony", destination: "/products/salonly", permanent: true },
      { source: "/work/cashew-ecommerce", destination: "/work/premium-cashew-ecommerce", permanent: true },
      { source: "/work/pvc-cpvc-machinery", destination: "/work", permanent: true },
    ];
  },
};

export default nextConfig;
