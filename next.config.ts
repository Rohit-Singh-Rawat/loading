import type { NextConfig } from "next";

const nextConfig = {
  reactCompiler: true,
  turbopack: {
    root: import.meta.dirname,
  },
} satisfies NextConfig;

export default nextConfig;
