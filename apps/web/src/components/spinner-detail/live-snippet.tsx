"use client";

import { type CSSProperties, Fragment } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import {
  componentName,
  type SnippetLine,
  snippetLines,
  snippetText,
  type TokenKind,
} from "@/lib/snippet";
import { snippetProps, useCustomization } from "./spinner-customization";

export type SnippetPalette = Record<TokenKind, CSSProperties>;

function useSnippet(): SnippetLine[] {
  const { item, state } = useCustomization();
  return snippetLines(componentName(item.slug), snippetProps(item, state));
}

function Line({
  line,
  palette,
}: {
  line: SnippetLine;
  palette: SnippetPalette;
}) {
  if (line.length === 0) {
    return <span data-line=""> </span>;
  }

  let offset = 0;
  return (
    <span data-line="">
      {line.map((token) => {
        const start = offset;
        offset += token.text.length;
        return (
          <span key={start} style={palette[token.kind]}>
            {token.text}
          </span>
        );
      })}
    </span>
  );
}

export function LiveSnippetLines({ palette }: { palette: SnippetPalette }) {
  const lines = useSnippet();

  return lines.map((line, index) => {
    const text = snippetText([line]);
    return (
      <Fragment key={text}>
        {index > 0 && "\n"}
        <Line line={line} palette={palette} />
      </Fragment>
    );
  });
}

export function LiveSnippetCopyButton({ className }: { className?: string }) {
  const lines = useSnippet();
  return <CopyButton className={className} text={snippetText(lines)} />;
}
