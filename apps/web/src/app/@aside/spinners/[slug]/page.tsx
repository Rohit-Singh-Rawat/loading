import { AsideShell } from "@/components/aside/aside-shell";
import { CopyPageButton } from "@/components/spinner-detail/copy-page-button";
import { Toc, type TocItem } from "@/components/spinner-detail/toc";
import { SPINNER_ITEMS } from "@/components/spinners";
import { PREVIEW_SECTION_ID } from "@/lib/constants";
import { getSpinnerDocument } from "@/lib/spinner-markdown";

interface Params {
  slug: string;
}

const PREVIEW_ITEM: TocItem = { id: PREVIEW_SECTION_ID, label: "Preview" };

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
