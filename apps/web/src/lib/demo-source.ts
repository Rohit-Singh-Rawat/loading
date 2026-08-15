import { readFile } from "node:fs/promises";
import path from "node:path";

const DEMO_DIRECTORY = "src/content/demos";

export async function readDemoSource(name: string): Promise<string> {
  const source = await readFile(
    path.join(process.cwd(), DEMO_DIRECTORY, `${name}.tsx`),
    "utf8"
  );
  return source.trim();
}
