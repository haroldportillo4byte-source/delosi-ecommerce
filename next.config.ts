import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      {
        source: "/product/:id",
        destination: "/products/:id",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/img/**",
      },
    ],
  },
};

export default nextConfig;
