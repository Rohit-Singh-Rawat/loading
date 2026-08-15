import { readFile } from "node:fs/promises";
import path from "node:path";
import GithubSlugger from "github-slugger";
import { getSpinner } from "@/components/spinners";
import { readDemoSource } from "@/lib/demo-source";

export interface DocumentHeading {
  depth: 2 | 3;
  id: string;
  label: string;
}

export interface SpinnerDocument {
  headings: DocumentHeading[];
  markdown: string;
}

const HEADING = /^(#{2,3})\s+(.+?)\s*$/gm;
const FENCED_BLOCK = /^```[\s\S]*?^```/gm;
const DEMO_TAG = /<Demo\s+name="([^"]+)"\s*\/>/;

function headingsOf(source: string): DocumentHeading[] {
  const slugger = new GithubSlugger();
  return Array.from(
    source.replace(FENCED_BLOCK, "").matchAll(HEADING),
    ([, hashes, label]): DocumentHeading => ({
      depth: hashes.length === 3 ? 3 : 2,
      id: slugger.slug(label),
      label,
    })
  );
}

const FENCE_OR_DEMO = new RegExp(
  `${FENCED_BLOCK.source}|${DEMO_TAG.source}`,
  "gm"
);

async function inlineDemos(source: string): Promise<string> {
  const parts: (string | Promise<string>)[] = [];
  let cursor = 0;

  for (const match of source.matchAll(FENCE_OR_DEMO)) {
    const [text, name] = match;
    if (name === undefined) {
      continue;
    }
    parts.push(
      source.slice(cursor, match.index),
      readDemoSource(name).then((code) => `\`\`\`tsx\n${code}\n\`\`\``)
    );
    cursor = match.index + text.length;
  }
  parts.push(source.slice(cursor));

  return (await Promise.all(parts)).join("").trim();
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
