import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { PrevNext } from "@/components/spinner-detail/prev-next";
import { SpinnerCustomizationProvider } from "@/components/spinner-detail/spinner-customization";
import { SpinnerPreview } from "@/components/spinner-detail/spinner-preview";
import { SpinnerSnippet } from "@/components/spinner-detail/spinner-snippet";
import {
  getAdjacentSpinners,
  getSpinner,
  SPINNER_ITEMS,
} from "@/components/spinners";
import { PageHeader } from "@/components/ui/page-header";
import { SITE_DESCRIPTION } from "@/lib/constants";
import { buildSnippetVariants } from "@/lib/spinner-snippet";

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

  const { default: Content }: { default: ComponentType } = await import(
    `@/content/spinners/${slug}.mdx`
  );
  const snippetVariants = await buildSnippetVariants(item);

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
          <div className="mt-2.5 flex flex-col">
            <SpinnerSnippet variants={snippetVariants} />
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
