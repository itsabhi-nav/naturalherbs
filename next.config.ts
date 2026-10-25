import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },
        ],
      },
      {
        // immutable caching for brand icons
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
        source: "/icon.png",
      },
      {
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
        source: "/apple-icon.png",
      },
      {
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
        source: "/logo-mark.png",
      },
    ];
  },
};

export default nextConfig;
