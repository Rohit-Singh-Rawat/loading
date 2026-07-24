import path from "node:path";
import createMDX from "@next/mdx";
import pierreDarkVibrant from "@pierre/theme/pierre-dark-vibrant";
import pierreLightVibrant from "@pierre/theme/pierre-light-vibrant";
import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    optimizePackageImports: [
      "central-icons",
      "central-icons-outlined",
      "motion",
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
          theme: { dark: pierreDarkVibrant, light: pierreLightVibrant },
        },
      ],
      "rehype-slug",
    ],
  },
});

export default withMDX(nextConfig);
