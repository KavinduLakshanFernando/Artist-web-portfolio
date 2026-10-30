import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.artic.edu',
      },
      {
        protocol: 'https',
        hostname: 'artic.edu',
      },
    ],
  },
};

export default nextConfig;
