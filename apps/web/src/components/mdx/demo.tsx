import type { ComponentType } from "react";
import { CodeFigure } from "@/components/mdx/code-figure";
import { readDemoSource } from "@/lib/demo-source";
import { highlightTsx } from "@/lib/highlight";

export async function Demo({ name }: { name: string }) {
  const [module, code]: [{ default: ComponentType }, string] =
    await Promise.all([
      import(`@/content/demos/${name}.tsx`),
      readDemoSource(name),
    ]);
  const Example = module.default;

  return (
    <CodeFigure
      className="mt-8"
      code={code}
      filename={`${name.slice(name.lastIndexOf("/") + 1)}.tsx`}
      html={await highlightTsx(code)}
      preview={<Example />}
    />
  );
}
