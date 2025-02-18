import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "y9wupci8wqgldyvr.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
