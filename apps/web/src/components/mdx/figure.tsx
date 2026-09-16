import {
  Children,
  type ComponentPropsWithoutRef,
  isValidElement,
  type ReactNode,
} from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { FIGURE_CLASSES } from "@/lib/code-block";

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

export function isFenceTitle(node: ReactNode): boolean {
  return (
    isValidElement(node) &&
    "data-rehype-pretty-code-title" in (node.props as Record<string, unknown>)
  );
}

export function MDXFigure({
  children,
  ...rest
}: ComponentPropsWithoutRef<"figure">) {
  if (!("data-rehype-pretty-code-figure" in rest)) {
    return <figure {...rest}>{children}</figure>;
  }

  const pre = Children.toArray(children).filter((item) => !isFenceTitle(item));

  return (
    <figure className={FIGURE_CLASSES}>
      <CopyButton className="absolute top-2 right-2" text={extractText(pre)} />
      {pre}
    </figure>
  );
}
