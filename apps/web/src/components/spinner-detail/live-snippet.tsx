"use client";

import { CodeBlock } from "@/components/code/code-block";
import { componentName, snippetLines } from "@/lib/code";
import { snippetProps, useCustomization } from "./spinner-customization";

export function LiveSnippet() {
  const { item, state } = useCustomization();
  return (
    <CodeBlock
      lines={snippetLines(componentName(item.slug), snippetProps(item, state))}
    />
  );
}
