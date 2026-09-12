import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CodePanel } from "@/components/mdx/code-panel";
import { Demo } from "@/components/mdx/demo";
import { PrevNext } from "@/components/spinner-detail/prev-next";
import { SpinnerPreview } from "@/components/spinner-detail/spinner-preview";
import {
  getAdjacentSpinners,
  getSpinner,
  type SpinnerParams,
  spinnerParams,
} from "@/components/spinners";
import { PageHeader } from "@/components/ui/page-header";
import Shared from "@/content/spinners/_shared.mdx";
import { SITE_DESCRIPTION } from "@/lib/constants";
import type { MDXModule } from "@/lib/mdx";

export const generateStaticParams = spinnerParams;

export async function generateMetadata({
  params,
}: {
  params: Promise<SpinnerParams>;
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
  params: Promise<SpinnerParams>;
}) {
  const { slug } = await params;
  const item = getSpinner(slug);

  if (!item) {
    notFound();
  }

  const { next, previous } = getAdjacentSpinners(slug);

  const { default: Snippet }: MDXModule = await import(
    `@/content/snippets/${slug}.mdx`
  );
  const Own = item.options
    ? ((await import(`@/content/spinners/${slug}.mdx`)) as MDXModule).default
    : null;

  const components = {
    Demo: (props: { name: string }) => <Demo {...props} slug={slug} />,
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        className="px-4"
        description={item.description}
        eyebrow="Component/"
        title={item.name}
      />
      <div className="flex flex-col">
        <CodePanel>
          <SpinnerPreview key={slug} slug={slug} />
          <Snippet />
        </CodePanel>
        <div className="flex flex-col px-4 [&>figure]:mt-6">
          <Shared components={components} />
          {Own && <Own components={components} />}
        </div>
      </div>
      {(previous || next) && (
        <>
          <hr className="border-border" />
          <PrevNext next={next} previous={previous} />
        </>
      )}
    </div>
  );
}
