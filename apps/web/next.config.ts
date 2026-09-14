import path from "node:path";
import { withInterfere } from "@interfere/next/config";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { CODE_THEMES } from "./src/lib/code-theme";
import { BLOB_BASE } from "./src/lib/constants";

const demoDependenciesLoader = path.resolve(
  import.meta.dirname,
  "src/lib/demo-dependencies-loader.cjs"
);

const nextConfig = {
  experimental: {
    optimizePackageImports: ["motion"],
  },
  images: {
    remotePatterns: [
      {
        hostname: new URL(BLOB_BASE).hostname,
        protocol: "https",
      },
    ],
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactCompiler: true,
  turbopack: {
    root: path.resolve(import.meta.dirname, "../.."),
    rules: {
      "apps/web/src/content/demos/**/*.mdx": {
        loaders: [demoDependenciesLoader],
      },
    },
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

export default withInterfere(withMDX(nextConfig));
