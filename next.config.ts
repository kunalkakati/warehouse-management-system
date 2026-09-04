import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/inventory/:path*", destination: "/Inventory/:path*" }];
  },
};

export default nextConfig;
