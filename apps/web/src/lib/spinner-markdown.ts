import { readFile } from "node:fs/promises";
import path from "node:path";
import GithubSlugger from "github-slugger";
import { getSpinner } from "@/components/spinners";

export interface DocumentHeading {
  id: string;
  label: string;
}

export interface SpinnerDocument {
  headings: DocumentHeading[];
  markdown: string;
}

const HEADING = /^##\s+(.+?)\s*$/gm;

function headingsOf(source: string): DocumentHeading[] {
  const slugger = new GithubSlugger();
  return Array.from(source.matchAll(HEADING), ([, label]) => ({
    id: slugger.slug(label),
    label,
  }));
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
    markdown: [`# ${item.name}`, item.description, raw].join("\n\n"),
  };
}
