import type { ComponentType } from "react";
import { CodeFigure } from "@/components/mdx/code-figure";
import { readDemoSource } from "@/lib/demo-source";
import { highlightTsx } from "@/lib/highlight";

/**
 * Renders the demo at `src/content/demos/<name>.tsx` above its own source. The
 * example and the snippet come from one file, so they cannot drift apart.
 */
export async function Demo({ name }: { name: string }) {
  const [module, code]: [{ default: ComponentType }, string] =
    await Promise.all([
      import(`@/content/demos/${name}.tsx`),
      readDemoSource(name),
    ]);
  const Example = module.default;

  return (
    <CodeFigure
      className="mt-4 mb-6"
      code={code}
      html={await highlightTsx(code)}
      preview={<Example />}
    />
  );
}
