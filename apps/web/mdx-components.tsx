// biome-ignore lint/suspicious/noExplicitAny: MDX components require flexible prop types
type MDXComponents = Record<string, React.ComponentType<any>>;

import { MDXCode } from "@/components/mdx/code";
import { MDXFigure } from "@/components/mdx/figure";
import { MDXHeading } from "@/components/mdx/heading";
import { MDXParagraph } from "@/components/mdx/paragraph";
import { MDXPre } from "@/components/mdx/pre";

export function useMDXComponents(
  components: MDXComponents = {}
): MDXComponents {
  return {
    code: MDXCode,
    figure: MDXFigure,
    h2: MDXHeading,
    p: MDXParagraph,
    pre: MDXPre,
    ...components,
  };
}
