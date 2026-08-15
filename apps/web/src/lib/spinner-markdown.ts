import { readFile } from "node:fs/promises";
import path from "node:path";
import GithubSlugger from "github-slugger";
import { getSpinner } from "@/components/spinners";
import { readDemoSource } from "@/lib/demo-source";

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

const DEMO_TAG = /<Demo\s+name="([^"]+)"\s*\/>/g;

/**
 * The MDX renders each demo as a component; the markdown route serves the same
 * document as plain prose, so every `<Demo />` becomes the demo's own source.
 */
async function inlineDemos(source: string): Promise<string> {
  const sources = new Map(
    await Promise.all(
      Array.from(
        source.matchAll(DEMO_TAG),
        async ([, name]) => [name, await readDemoSource(name)] as const
      )
    )
  );

  return source
    .replace(
      DEMO_TAG,
      (_match, name: string) => `\`\`\`tsx\n${sources.get(name)}\n\`\`\``
    )
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
    markdown: [`# ${item.name}`, item.description, await inlineDemos(raw)].join(
      "\n\n"
    ),
  };
}
