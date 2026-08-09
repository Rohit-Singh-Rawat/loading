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
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { siteDescription } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/metadata";

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
  return generatePageMetadata({
    description: item?.description ?? siteDescription,
    title: item?.name ?? "Spinners",
  });
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
      <div className="flex flex-col gap-5">
        <Heading as="h1" className="font-heldane" size={1} weight="regular">
          <span className="block text-gray-900">Component/</span>
          {item.name}
        </Heading>
        {item.description && (
          <Text className="text-text-paragraph" size="sm">
            {item.description}
          </Text>
        )}
      </div>
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
        <div className="flex h-52 items-center justify-center rounded-3xl bg-preview-bg shadow-custom">
          <Text className="text-text-paragraph" size="sm">
            Coming soon.
          </Text>
        </div>
      )}
      {(previous || next) && (
        <>
          <hr className="border-gray-200" />
          <PrevNext next={next} previous={previous} />
        </>
      )}
    </div>
  );
}
