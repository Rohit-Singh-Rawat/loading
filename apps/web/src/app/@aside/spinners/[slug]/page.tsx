import { readFile } from "node:fs/promises";
import path from "node:path";
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
    return <div className="hidden w-[240px] shrink-0 xl:block" />;
  }

  const raw = await readSpinnerMarkdown(slug);
  const markdown = [`# ${item.name}`, item.description, raw]
    .filter(Boolean)
    .join("\n\n");

  return (
    <aside className="hidden w-[240px] shrink-0 py-[100px] xl:block">
      <div className="sticky top-[100px] flex flex-col gap-4">
        <CopyPageButton markdown={markdown} />
        <Toc items={TOC_ITEMS} />
      </div>
    </aside>
  );
}
