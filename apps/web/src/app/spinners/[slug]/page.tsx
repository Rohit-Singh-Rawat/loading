import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrevNext } from "@/components/spinner-detail/prev-next";
import { SpinnerCustomizationProvider } from "@/components/spinner-detail/spinner-customization";
import { SpinnerPreview } from "@/components/spinner-detail/spinner-preview";
import {
  getAdjacentSpinners,
  getSpinner,
  SPINNER_ITEMS,
} from "@/components/spinners";
import { PageHeader } from "@/components/ui/page-header";
import { SITE_DESCRIPTION } from "@/lib/constants";
import type { MDXModule } from "@/lib/mdx";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return SPINNER_ITEMS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getSpinner(slug);
  return {
    description: item?.description ?? SITE_DESCRIPTION,
    title: item?.name ?? "Spinners",
  };
}

export default async function SpinnerPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const item = getSpinner(slug);

  if (!item) {
    notFound();
  }

  const { next, previous } = getAdjacentSpinners(slug);

  const [{ default: Content }, { default: Snippet }]: [MDXModule, MDXModule] =
    await Promise.all([
      import(`@/content/spinners/${slug}.mdx`),
      import(`@/content/snippets/${slug}.mdx`),
    ]);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        description={item.description}
        eyebrow="Component/"
        title={item.name}
      />
      <SpinnerCustomizationProvider slug={slug}>
        <div className="flex flex-col">
          <SpinnerPreview />
          <div className="flex flex-col [&>figure]:mt-6">
            <div className="mt-2.5">
              <Snippet />
            </div>
            <Content />
          </div>
        </div>
      </SpinnerCustomizationProvider>
      {(previous || next) && (
        <>
          <hr className="border-border" />
          <PrevNext next={next} previous={previous} />
        </>
      )}
    </div>
  );
}
