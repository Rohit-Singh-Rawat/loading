import path from "node:path";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { CODE_THEMES } from "./src/lib/code-theme";

const nextConfig = {
  experimental: {
    optimizePackageImports: [
      "central-icons",
      "central-icons-outlined",
      "motion",
    ],
  },
  images: {
    remotePatterns: [
      {
        hostname: "ru2qm1zsj1gavqlm.public.blob.vercel-storage.com",
        protocol: "https",
      },
    ],
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactCompiler: true,
  turbopack: {
    root: path.resolve(import.meta.dirname, "../.."),
  },
} satisfies NextConfig;

const withMDX = createMDX({
  options: {
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          grid: true,
          keepBackground: false,
          theme: CODE_THEMES,
        },
      ],
      "rehype-slug",
    ],
    remarkPlugins: [
      "remark-code-import",
      ["remark-smartypants", { dashes: false }],
    ],
  },
});

export default withMDX(nextConfig);
