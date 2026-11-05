import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // Set turbopack root to frontend directory to avoid lockfile confusion
  turbopack: {
    root: process.cwd(),
  },

  // Allow images from external domains (e.g. user-uploaded photos via backend)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Proxy /api calls to backend during local dev (keeps CORS simple)
  async rewrites() {
    return process.env.NODE_ENV === "development"
      ? [
          {
            source: "/api/:path*",
            destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
          },
        ]
      : [];
  },
};

export default nextConfig;
