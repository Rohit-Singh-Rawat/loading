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
import type { MDXModule, SpinnerMDXModule } from "@/lib/mdx";

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

  const [{ default: Shared }, Unique, { default: Snippet }] = await Promise.all(
    [
      import("@/content/spinners/_shared.mdx") as Promise<SpinnerMDXModule>,
      import(`@/content/spinners/${slug}.mdx`).then(
        (module: SpinnerMDXModule) => module.default,
        () => null
      ),
      import(`@/content/snippets/${slug}.mdx`) as Promise<MDXModule>,
    ]
  );

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        className="px-4"
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
            <Shared slug={slug} />
            {Unique && <Unique slug={slug} />}
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
