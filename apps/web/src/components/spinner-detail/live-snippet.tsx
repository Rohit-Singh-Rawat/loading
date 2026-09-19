"use client";

import { CodeFrame, CodeLine } from "@/components/code/code-frame";
import {
  codeText,
  componentName,
  type CodeLine as Line,
  snippetLines,
} from "@/lib/code";
import type { SNIPPET_PALETTE } from "@/lib/code-theme";
import { snippetProps, useCustomization } from "./spinner-customization";

function key(line: Line): string {
  return codeText([line]);
}

export function LiveSnippet({ palette }: { palette: typeof SNIPPET_PALETTE }) {
  const { item, state } = useCustomization();
  const lines = snippetLines(
    componentName(item.slug),
    snippetProps(item, state)
  );

  return (
    <CodeFrame text={codeText(lines)}>
      {lines.map((line) => {
        let offset = 0;
        return (
          <CodeLine key={key(line)}>
            {line.length === 0
              ? " "
              : line.map((token) => {
                  const start = offset;
                  offset += token.text.length;
                  return (
                    <span key={start} style={palette[token.kind]}>
                      {token.text}
                    </span>
                  );
                })}
          </CodeLine>
        );
      })}
    </CodeFrame>
  );
}
