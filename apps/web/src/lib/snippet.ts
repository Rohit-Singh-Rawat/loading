import type * as Library from "loading-dev";
import type { SpinnerName } from "loading-dev";

export type TokenKind =
  | "identifier"
  | "keyword"
  | "number"
  | "plain"
  | "string"
  | "tag";

export interface SnippetToken {
  kind: TokenKind;
  text: string;
}

export type SnippetLine = SnippetToken[];

export type SnippetProps = Record<string, number | string>;

const PRINT_WIDTH = 80;

type PascalCase<S extends string> = S extends `${infer Head}-${infer Tail}`
  ? `${Capitalize<Head>}${PascalCase<Tail>}`
  : Capitalize<S>;

export type ComponentName =
  PascalCase<SpinnerName> extends keyof typeof Library
    ? PascalCase<SpinnerName>
    : never;

export function componentName(slug: SpinnerName): ComponentName {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("") as ComponentName;
}

function token(kind: TokenKind, text: string): SnippetToken {
  return { kind, text };
}

function attribute(name: string, value: number | string): SnippetLine {
  const head = [token("identifier", name), token("keyword", "=")];
  return typeof value === "string"
    ? [...head, token("string", `"${value}"`)]
    : [
        ...head,
        token("plain", "{"),
        token("number", `${value}`),
        token("plain", "}"),
      ];
}

function merge(line: SnippetLine): SnippetLine {
  const merged: SnippetLine = [];
  for (const current of line) {
    const last = merged.at(-1);
    if (last?.kind === current.kind) {
      last.text += current.text;
    } else {
      merged.push({ ...current });
    }
  }
  return merged;
}

function width(line: SnippetLine): number {
  return line.reduce((total, { text }) => total + text.length, 0);
}

export function snippetLines(
  name: ComponentName,
  props: SnippetProps
): SnippetLine[] {
  const attributes = Object.entries(props)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([prop, value]) => attribute(prop, value));

  const compact: SnippetLine = [
    token("plain", "  "),
    token("keyword", "return"),
    token("plain", " <"),
    token("tag", name),
    ...attributes.flatMap((line) => [token("plain", " "), ...line]),
    token("plain", " />;"),
  ];

  const element: SnippetLine[] =
    width(compact) <= PRINT_WIDTH
      ? [compact]
      : [
          [
            token("plain", "  "),
            token("keyword", "return"),
            token("plain", " ("),
          ],
          [token("plain", "    <"), token("tag", name)],
          ...attributes.map((line) => [token("plain", "      "), ...line]),
          [token("plain", "    />")],
          [token("plain", "  );")],
        ];

  return [
    [
      token("keyword", "import"),
      token("plain", " { "),
      token("identifier", name),
      token("plain", " } "),
      token("keyword", "from"),
      token("plain", " "),
      token("string", '"loading-dev"'),
      token("plain", ";"),
    ],
    [],
    [
      token("keyword", "export"),
      token("plain", " "),
      token("keyword", "function"),
      token("plain", " "),
      token("identifier", `${name}Demo`),
      token("plain", "() {"),
    ],
    ...element,
    [token("plain", "}")],
  ].map(merge);
}

export function snippetText(lines: SnippetLine[]): string {
  return lines.map((line) => line.map(({ text }) => text).join("")).join("\n");
}
