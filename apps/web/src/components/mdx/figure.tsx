import { Children, isValidElement, type ReactNode } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { FIGURE_CLASSES } from "@/lib/code-block";
import { cn } from "@/lib/utils";

function extractText(node: ReactNode): string {
  if (typeof node === "string") {
    return node;
  }
  if (typeof node === "number") {
    return node.toString();
  }
  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }
  if (isValidElement(node)) {
    return extractText((node.props as { children?: ReactNode }).children);
  }
  return "";
}

export function MDXFigure({
  children,
  ...rest
}: {
  children: ReactNode;
} & Record<string, unknown>) {
  if (!("data-rehype-pretty-code-figure" in rest)) {
    return <figure {...rest}>{children}</figure>;
  }

  const items = Children.toArray(children);
  const titleChild = items.find(
    (item) =>
      isValidElement(item) &&
      "data-rehype-pretty-code-title" in (item.props as Record<string, unknown>)
  );
  const preChild = items.find((item) => item !== titleChild);

  if (!(titleChild && isValidElement(titleChild))) {
    return <figure className={FIGURE_CLASSES}>{children}</figure>;
  }

  const code = extractText(preChild);

  return (
    <figure className={cn(FIGURE_CLASSES, "relative")}>
      <CopyButton className="absolute top-2 right-2" text={code} />
      {preChild}
    </figure>
  );
}
