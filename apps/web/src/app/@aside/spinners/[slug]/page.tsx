import { AsideShell } from "@/components/aside/aside-shell";
import { CopyPageButton } from "@/components/spinner-detail/copy-page-button";
import { TOC_ITEMS, Toc } from "@/components/spinner-detail/toc";
import { SPINNER_ITEMS } from "@/components/spinners";
import { getSpinnerMarkdown } from "@/lib/spinner-markdown";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return SPINNER_ITEMS.map(({ slug }) => ({ slug }));
}

export default async function SpinnerAside({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const markdown = await getSpinnerMarkdown(slug);

  if (markdown === null) {
    return <AsideShell />;
  }

  return (
    <AsideShell>
      <CopyPageButton markdown={markdown} slug={slug} />
      <Toc items={TOC_ITEMS} />
    </AsideShell>
  );
}
