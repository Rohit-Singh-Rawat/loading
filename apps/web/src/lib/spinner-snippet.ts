import type { SpinnerItem } from "@/components/spinners";
import { highlightTsx } from "./highlight";

export interface SnippetVariant {
  /** Plain source, for the copy button. */
  code: string;
  /** Highlighted markup. */
  html: string;
  size: number;
}

function source(componentName: string, size: number): string {
  return `import { ${componentName} } from "loading-dev";

export function ${componentName}Demo() {
  return <${componentName} size={${size}} />;
}`;
}

/**
 * One highlighted snippet per size the spinner offers. The size control has a
 * fixed set of options, so every snippet the reader can reach is built ahead
 * of time — no highlighter ships to the browser.
 */
export function buildSnippetVariants(
  item: SpinnerItem
): Promise<SnippetVariant[]> {
  return Promise.all(
    item.customization.sizes.map(async ({ value }) => {
      const code = source(item.componentName, value);
      return { code, html: await highlightTsx(code), size: value };
    })
  );
}
