import { readFile } from "node:fs/promises";
import path from "node:path";
import GithubSlugger from "github-slugger";
import { getSpinner } from "@/components/spinners";
import { readDemoSnippet } from "@/lib/demo-source";

export interface DocumentHeading {
  id: string;
  label: string;
}

export interface SpinnerDocument {
  headings: DocumentHeading[];
  markdown: string;
}

const TOKEN = /^```[\s\S]*?^```|^##\s+(.+?)\s*$|<Demo\s+name="([^"]+)"\s*\/>/gm;

async function parse(source: string): Promise<SpinnerDocument> {
  const slugger = new GithubSlugger();
  const headings: DocumentHeading[] = [];
  const parts: (string | Promise<string>)[] = [];
  let cursor = 0;

  for (const match of source.matchAll(TOKEN)) {
    const [token, label, demo] = match;
    if (label !== undefined) {
      headings.push({ id: slugger.slug(label), label });
      continue;
    }
    if (demo === undefined) {
      continue;
    }

    parts.push(source.slice(cursor, match.index), readDemoSnippet(demo));
    cursor = match.index + token.length;
  }
  parts.push(source.slice(cursor));

  return { headings, markdown: (await Promise.all(parts)).join("").trim() };
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
  const { headings, markdown } = await parse(raw);

  return {
    headings,
    markdown: [`# ${item.name}`, item.description, markdown].join("\n\n"),
  };
}
