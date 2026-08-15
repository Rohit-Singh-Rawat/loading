import { readFile } from "node:fs/promises";
import path from "node:path";

const DEMO_DIRECTORY = "src/content/demos";

const DEMO_NAME = /^[a-z\d-]+\/[a-z\d-]+$/;

export async function readDemoSnippet(name: string): Promise<string> {
  if (!DEMO_NAME.test(name)) {
    throw new Error(`Demo name must be "<slug>/<demo>", got "${name}"`);
  }
  const source = await readFile(
    path.join(process.cwd(), DEMO_DIRECTORY, `${name}.mdx`),
    "utf8"
  );
  return source.trim();
}
