import { AsideShell } from "@/components/aside/aside-shell";
import { CopyPageButton } from "@/components/spinner-detail/copy-page-button";
import { Toc } from "@/components/spinner-detail/toc";
import { SPINNER_ITEMS } from "@/components/spinners";
import { getSpinnerDocument } from "@/lib/spinner-markdown";

interface Params {
  slug: string;
}

/** The preview is rendered by the page, not the document, so it is prepended. */
const PREVIEW_ITEM = { id: "preview", label: "Preview" };

export function generateStaticParams(): Params[] {
  return SPINNER_ITEMS.map(({ slug }) => ({ slug }));
}

export default async function SpinnerAside({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const document = await getSpinnerDocument(slug);

  if (!document) {
    return <AsideShell />;
  }

  return (
    <AsideShell>
      <CopyPageButton markdown={document.markdown} slug={slug} />
      <Toc items={[PREVIEW_ITEM, ...document.headings]} />
    </AsideShell>
  );
}
