import { readFile } from "node:fs/promises";
import path from "node:path";
import { getSpinner } from "@/components/spinners";

export async function getSpinnerMarkdown(slug: string): Promise<string | null> {
  const item = getSpinner(slug);
  if (!item) {
    return null;
  }

  const raw = await readFile(
    path.join(process.cwd(), "src/content/spinners", `${slug}.mdx`),
    "utf8"
  );

  return [`# ${item.name}`, item.description, raw].join("\n\n");
}
