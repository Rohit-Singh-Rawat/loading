import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSpinner, SPINNER_ITEMS } from "@/components/spinners";

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
  return { title: item?.name ?? "Spinners" };
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

  const Spinner = item.component;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heldane text-[24px] leading-8">{item.name}</h1>
      <div className="flex h-[208px] items-center justify-center rounded-[20px] bg-gray-100 outline-light">
        {Spinner ? (
          <Spinner size={20} />
        ) : (
          <p className="text-[13px] text-gray-1000 leading-5">Coming soon.</p>
        )}
      </div>
    </div>
  );
}
