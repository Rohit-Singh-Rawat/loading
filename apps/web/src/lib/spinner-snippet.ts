import type { SpinnerItem } from "@/components/spinners";
import { highlightTsx } from "./highlight";

export interface SnippetVariant {
  code: string;
  html: string;
  size: number;
}

function source(componentName: string, size: number): string {
  return `import { ${componentName} } from "loading-dev";

export function ${componentName}Demo() {
  return <${componentName} size={${size}} />;
}`;
}

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
