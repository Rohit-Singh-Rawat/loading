import path from "node:path";
import type { NextConfig } from "next";

const nextConfig = {
  reactCompiler: true,
  turbopack: {
    root: path.resolve(import.meta.dirname, "../.."),
  },
} satisfies NextConfig;

export default nextConfig;
