import { readFile } from "node:fs/promises";
import path from "node:path";
import { AsideShell } from "@/components/aside/aside-shell";
import { CopyPageButton } from "@/components/spinner-detail/copy-page-button";
import { TOC_ITEMS, Toc } from "@/components/spinner-detail/toc";
import { getSpinner, SPINNER_ITEMS } from "@/components/spinners";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return SPINNER_ITEMS.map(({ slug }) => ({ slug }));
}

async function readSpinnerMarkdown(slug: string): Promise<string | null> {
  try {
    return await readFile(
      path.join(process.cwd(), "src/content/spinners", `${slug}.mdx`),
      "utf8"
    );
  } catch {
    return null;
  }
}

export default async function SpinnerAside({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const item = getSpinner(slug);

  if (!item?.hasDocs) {
    return <AsideShell />;
  }

  const raw = await readSpinnerMarkdown(slug);
  const markdown = [`# ${item.name}`, item.description, raw]
    .filter(Boolean)
    .join("\n\n");

  return (
    <AsideShell>
      <CopyPageButton markdown={markdown} />
      <Toc items={TOC_ITEMS} />
    </AsideShell>
  );
}
