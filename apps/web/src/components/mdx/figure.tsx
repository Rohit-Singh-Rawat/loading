import { Children, isValidElement, type ReactNode } from "react";
import { CodeBlockHeader } from "@/components/mdx/code-block-header";
import { FIGURE_CLASSES } from "@/lib/code-block";
import { cn } from "@/lib/utils";

const marginClasses = {
  both: "mt-6 mb-6",
  bottom: "mb-6",
  none: "",
  top: "mt-6",
} as const;

type FigureMargin = keyof typeof marginClasses;

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
  margin,
  ...rest
}: {
  children: ReactNode;
  margin?: FigureMargin;
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
    return (
      <figure className={cn(FIGURE_CLASSES, marginClasses[margin ?? "none"])}>
        {children}
      </figure>
    );
  }

  const titleProps = titleChild.props as {
    children?: ReactNode;
    "data-language"?: string;
  };
  const filename = extractText(titleProps.children);
  const code = extractText(preChild);

  return (
    <figure className={cn(FIGURE_CLASSES, marginClasses[margin ?? "top"])}>
      <CodeBlockHeader code={code} filename={filename} />
      {preChild}
    </figure>
  );
}
