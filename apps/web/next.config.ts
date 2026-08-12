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
  // The Ring spinner shipped as "Loader" on the site while the package always
  // exported `Ring`. The package name won; this keeps the old URL working.
  async redirects() {
    return [
      {
        destination: "/spinners/ring",
        permanent: true,
        source: "/spinners/loader",
      },
    ];
  },
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
    remarkPlugins: [["remark-smartypants", { dashes: false }]],
  },
});

export default withMDX(nextConfig);
