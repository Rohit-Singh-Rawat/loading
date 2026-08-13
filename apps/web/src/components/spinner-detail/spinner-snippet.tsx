"use client";

import { CodeBlockHeader } from "@/components/mdx/code-block-header";
import { FIGURE_CLASSES } from "@/lib/code-block";
import type { SnippetVariant } from "@/lib/spinner-snippet";
import { useSpinnerCustomization } from "./spinner-customization";

export function SpinnerSnippet({ variants }: { variants: SnippetVariant[] }) {
  const { item, state } = useSpinnerCustomization();
  const variant =
    variants.find((candidate) => candidate.size === state.size) ?? variants[0];

  return (
    <figure className={FIGURE_CLASSES}>
      <CodeBlockHeader code={variant.code} filename={`${item.slug}-demo.tsx`} />
      {/** biome-ignore lint/security/noDangerouslySetInnerHtml: highlighter output built on the server from a fixed template */}
      <div dangerouslySetInnerHTML={{ __html: variant.html }} />
    </figure>
  );
}
