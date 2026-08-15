// biome-ignore lint/suspicious/noExplicitAny: MDX components require flexible prop types
type MDXComponents = Record<string, React.ComponentType<any>>;

import { MDXCode } from "@/components/mdx/code";
import { DemoWithCode } from "@/components/mdx/demo-with-code";
import { MDXFigure } from "@/components/mdx/figure";
import { MDXHeading, MDXSubheading } from "@/components/mdx/heading";
import { MDXParagraph } from "@/components/mdx/paragraph";
import { MDXPre } from "@/components/mdx/pre";

export function useMDXComponents(
  components: MDXComponents = {}
): MDXComponents {
  return {
    code: MDXCode,
    DemoWithCode,
    figure: MDXFigure,
    h2: MDXHeading,
    h3: MDXSubheading,
    p: MDXParagraph,
    pre: MDXPre,
    ...components,
  };
}
