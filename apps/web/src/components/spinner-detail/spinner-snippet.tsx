"use client";

import { CodeFigure } from "@/components/mdx/code-figure";
import type { SnippetVariant } from "@/lib/spinner-snippet";
import { useSpinnerCustomization } from "./spinner-customization";

export function SpinnerSnippet({ variants }: { variants: SnippetVariant[] }) {
  const { item, state } = useSpinnerCustomization();
  const variant = variants[state.sizeIndex];

  return (
    <CodeFigure
      code={variant.code}
      filename={`${item.slug}-demo.tsx`}
      html={variant.html}
    />
  );
}
