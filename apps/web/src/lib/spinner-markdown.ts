import { readFile } from "node:fs/promises";
import path from "node:path";
import GithubSlugger from "github-slugger";
import { getSpinner } from "@/components/spinners";

export interface DocumentHeading {
  /** 2 for `##`, 3 for `###` — the table of contents indents the deeper level. */
  depth: number;
  id: string;
  label: string;
}

export interface SpinnerDocument {
  headings: DocumentHeading[];
  markdown: string;
}

const HEADING = /^(#{2,3})\s+(.+?)\s*$/gm;
const FENCED_BLOCK = /^```[\s\S]*?^```/gm;

function headingsOf(source: string): DocumentHeading[] {
  const slugger = new GithubSlugger();
  return Array.from(
    source.replace(FENCED_BLOCK, "").matchAll(HEADING),
    ([, hashes, label]) => ({
      depth: hashes.length,
      id: slugger.slug(label),
      label,
    })
  );
}

const IMPORT_LINE = /^import .*\n/gm;
const DEMO_BLOCK =
  /<DemoWithCode[^>]*code=\{`([\s\S]*?)`\}[\s\S]*?<\/DemoWithCode>/g;
const BLANK_RUN = /\n{3,}/g;

/**
 * The MDX is authored with JSX demos; what the markdown route serves should be
 * plain prose, so imports drop out and each demo collapses to its snippet.
 */
function toPlainMarkdown(source: string): string {
  return source
    .replace(IMPORT_LINE, "")
    .replace(DEMO_BLOCK, (_match, code: string) => `\`\`\`tsx\n${code}\n\`\`\``)
    .replace(BLANK_RUN, "\n\n")
    .trim();
}

export async function getSpinnerDocument(
  slug: string
): Promise<SpinnerDocument | null> {
  const item = getSpinner(slug);
  if (!item) {
    return null;
  }

  const raw = await readFile(
    path.join(process.cwd(), "src/content/spinners", `${slug}.mdx`),
    "utf8"
  );

  return {
    headings: headingsOf(raw),
    markdown: [`# ${item.name}`, item.description, toPlainMarkdown(raw)].join(
      "\n\n"
    ),
  };
}
