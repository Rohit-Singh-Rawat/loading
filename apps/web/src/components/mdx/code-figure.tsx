import type { ReactNode } from "react";
import { CodeBlockHeader } from "@/components/mdx/code-block-header";
import { FIGURE_CLASSES } from "@/lib/code-block";
import { cn } from "@/lib/utils";

/**
 * A code block in a bordered figure, optionally under a live preview of what
 * that code renders. `html` is highlighter output, so callers build it on the
 * server and this component only places it.
 */
export function CodeFigure({
  className,
  code,
  filename,
  html,
  preview,
}: {
  className?: string;
  code: string;
  filename: string;
  html: string;
  preview?: ReactNode;
}) {
  return (
    <figure className={cn(FIGURE_CLASSES, className)}>
      {preview ? (
        <div className="flex min-h-36 items-center justify-center border-border border-b px-4 py-8">
          {preview}
        </div>
      ) : null}
      <CodeBlockHeader code={code} filename={filename} />
      {/** biome-ignore lint/security/noDangerouslySetInnerHtml: highlighter output built on the server */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  );
}
