import GithubSlugger from "github-slugger";
import { getSpinner } from "@/components/spinners";
import { readContent } from "@/lib/content";

export interface DocumentHeading {
  id: string;
  label: string;
}

export interface SpinnerDocument {
  headings: DocumentHeading[];
  markdown: string;
}

const TOKEN = /^```[\s\S]*?^```|^##\s+(.+?)\s*$|<Demo\s+name="([^"]+)"\s*\/>/gm;

async function demoFence(slug: string, demo: string): Promise<string> {
  const source = await readContent("demos", slug, `${demo}.tsx`);
  return `\`\`\`tsx title="${slug}.tsx"\n${source}\n\`\`\``;
}

async function parse(source: string, slug: string): Promise<SpinnerDocument> {
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

    parts.push(source.slice(cursor, match.index), demoFence(slug, demo));
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

  const [shared, snippet, ...options] = await Promise.all([
    readContent("spinners", "_shared.mdx"),
    readContent("snippets", `${slug}.mdx`),
    ...(item.options ?? []).map((option) =>
      readContent("options", `${option.prop}.mdx`)
    ),
  ]);
  const documents = await Promise.all(
    [shared, ...options].map((source) => parse(source, slug))
  );
  const headings = documents.flatMap((document) => document.headings);
  const ids = new Set<string>();
  for (const heading of headings) {
    if (ids.has(heading.id)) {
      throw new Error(
        `Duplicate heading ID "${heading.id}" in spinner "${slug}"`
      );
    }
    ids.add(heading.id);
  }
  const markdown = documents.map((document) => document.markdown).join("\n\n");

  return {
    headings,
    markdown: [`# ${item.name}`, item.description, snippet, markdown].join(
      "\n\n"
    ),
  };
}
