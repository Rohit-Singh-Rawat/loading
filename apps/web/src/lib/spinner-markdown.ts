import { readFile } from "node:fs/promises";
import path from "node:path";
import { getSpinner } from "@/components/spinners";

export async function getSpinnerMarkdown(slug: string): Promise<string | null> {
  const item = getSpinner(slug);
  if (!item?.hasDocs) {
    return null;
  }

  let raw: string | null = null;
  try {
    raw = await readFile(
      path.join(process.cwd(), "src/content/spinners", `${slug}.mdx`),
      "utf8"
    );
  } catch {
    raw = null;
  }

  return [`# ${item.name}`, item.description, raw].filter(Boolean).join("\n\n");
}
