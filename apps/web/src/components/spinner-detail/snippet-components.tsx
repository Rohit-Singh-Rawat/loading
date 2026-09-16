import type { MDXComponents } from "mdx/types";
import {
  Children,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  isValidElement,
  type ReactNode,
} from "react";
import { isFenceTitle } from "@/components/mdx/figure";
import { FIGURE_CLASSES } from "@/lib/code-block";
import type { TokenKind } from "@/lib/snippet";
import {
  LiveSnippetCopyButton,
  LiveSnippetLines,
  type SnippetPalette,
} from "./live-snippet";

interface Sample {
  style: CSSProperties;
  text: string;
}

const NUMBER = /^\d+$/;

const PROBES: Record<
  TokenKind,
  (sample: Sample, index: number, samples: Sample[]) => boolean
> = {
  identifier: ({ text }) => text === "size",
  keyword: ({ text }) => text === "import",
  number: ({ text }) => NUMBER.test(text),
  plain: ({ text }) => text === ";",
  string: ({ text }) => text === '"loading-dev"',
  tag: (_, index, samples) =>
    index > 0 && samples[index - 1].text.endsWith("<"),
};

function collectSamples(node: ReactNode, samples: Sample[]) {
  for (const child of Children.toArray(node)) {
    if (
      !isValidElement<{ children?: ReactNode; style?: CSSProperties }>(child)
    ) {
      continue;
    }
    const { children, style } = child.props;
    if (style && "--shiki-light" in style && typeof children === "string") {
      samples.push({ style, text: children.trim() });
    } else {
      collectSamples(children, samples);
    }
  }
}

function paletteFrom(children: ReactNode): SnippetPalette {
  const samples: Sample[] = [];
  collectSamples(children, samples);

  const entries = Object.entries(PROBES).map(([kind, probe]) => {
    const sample = samples.find(probe);
    if (!sample) {
      throw new Error(`Snippet has no ${kind} token to take a colour from`);
    }
    return [kind, sample.style];
  });

  return Object.fromEntries(entries) as SnippetPalette;
}

function SnippetFigure({
  children,
  ...rest
}: ComponentPropsWithoutRef<"figure">) {
  if (!("data-rehype-pretty-code-figure" in rest)) {
    return <figure {...rest}>{children}</figure>;
  }

  const pre = Children.toArray(children).filter((item) => !isFenceTitle(item));

  return (
    <figure className={FIGURE_CLASSES}>
      <LiveSnippetCopyButton className="absolute top-2 right-2" />
      {pre}
    </figure>
  );
}

function SnippetCode({ children, ...rest }: ComponentPropsWithoutRef<"code">) {
  return (
    <code {...rest}>
      <LiveSnippetLines palette={paletteFrom(children)} />
    </code>
  );
}

export const SNIPPET_COMPONENTS: MDXComponents = {
  code: SnippetCode,
  figure: SnippetFigure,
};
