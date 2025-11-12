import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["cdn.sanity.io"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
 
  webpack: (config: { resolve: { fallback: Record<string, boolean | string> } }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'part:@sanity/base/client': false,
      'part:@sanity/base/initial-value-templates': false,
    };
    return config;
  },



};

export default nextConfig;
