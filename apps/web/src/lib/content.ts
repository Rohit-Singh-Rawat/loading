import { access, readFile } from "node:fs/promises";
import path from "node:path";

const CONTENT_DIRECTORY = "src/content";

export function hasContent(...segments: string[]): Promise<boolean> {
  return access(path.join(process.cwd(), CONTENT_DIRECTORY, ...segments)).then(
    () => true,
    () => false
  );
}

export function readContent(...segments: string[]): Promise<string> {
  return readFile(
    path.join(process.cwd(), CONTENT_DIRECTORY, ...segments),
    "utf8"
  ).then((source) => source.trim());
}
