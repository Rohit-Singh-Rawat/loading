import type { ReactNode } from "react";
import { CodeBlockHeader } from "@/components/mdx/code-block-header";
import { FIGURE_CLASSES } from "@/lib/code-block";
import { highlightTsx } from "@/lib/highlight";
import { cn } from "@/lib/utils";

/**
 * A live example stacked on the code that produces it. `children` is the
 * example, `code` is the source shown underneath — they are written out
 * separately so the snippet can stay readable while the demo adds whatever
 * layout it needs.
 */
export async function DemoWithCode({
  children,
  className,
  code,
  filename,
}: {
  children: ReactNode;
  className?: string;
  code: string;
  filename?: string;
}) {
  const html = await highlightTsx(code);

  return (
    <figure className={cn(FIGURE_CLASSES, "mt-4 mb-6")}>
      <div
        className={cn(
          "flex min-h-36 items-center justify-center border-border border-b px-4 py-8",
          className
        )}
      >
        {children}
      </div>
      <CodeBlockHeader code={code} filename={filename} />
      {/** biome-ignore lint/security/noDangerouslySetInnerHtml: highlighter output built on the server from authored MDX */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  );
}
