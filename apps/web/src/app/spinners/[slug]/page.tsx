import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { PrevNext } from "@/components/spinner-detail/prev-next";
import { SpinnerPreview } from "@/components/spinner-detail/spinner-preview";
import {
  getAdjacentSpinners,
  getSpinner,
  SPINNER_ITEMS,
} from "@/components/spinners";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Text } from "@/components/ui/text";
import { SITE_DESCRIPTION } from "@/lib/constants";

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

  let Content: ComponentType | null = null;
  if (item.hasDocs) {
    ({ default: Content } = await import(`@/content/spinners/${slug}.mdx`));
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        description={item.description}
        eyebrow="Component/"
        title={item.name}
      />
      {item.component ? (
        <div className="flex flex-col">
          <SpinnerPreview slug={slug} />
          {Content && (
            <div className="mt-2.5 flex flex-col">
              <Content />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-start gap-3 rounded-2xl bg-background p-8">
          <Text className="text-content" size="sm" weight="semibold">
            {item.name} is not built yet
          </Text>
          <Text className="max-w-sm text-content-subtle" size="sm">
            It is on the list, but there is nothing to preview or install for it
            today.
          </Text>
          <Button className="mt-1" href="/" size="xs" variant="tertiary">
            Browse available spinners
          </Button>
        </div>
      )}
      {(previous || next) && (
        <>
          <hr className="border-border" />
          <PrevNext next={next} previous={previous} />
        </>
      )}
    </div>
  );
}
