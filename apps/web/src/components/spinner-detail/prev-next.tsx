import { IconArrowLeft } from "central-icons-outlined/IconArrowLeft";
import { IconArrowRight } from "central-icons-outlined/IconArrowRight";
import Link from "next/link";
import type { SpinnerItem } from "@/components/spinners";
import { Text } from "@/components/ui/text";

export function PrevNext({
  next,
  previous,
}: {
  next?: SpinnerItem;
  previous?: SpinnerItem;
}) {
  if (!(previous || next)) {
    return null;
  }

  return (
    <div className="flex w-full gap-8">
      {previous ? (
        <Link
          className="flex min-w-0 flex-1 items-center justify-between rounded-xl bg-preview-bg px-3.5 py-3 shadow-custom transition-[background-color,color,scale] duration-200 ease-out will-change-transform hover:bg-gray-100 active:scale-[0.97]"
          href={`/spinners/${previous.slug}`}
        >
          <IconArrowLeft className="size-4 shrink-0 text-gray-1000" />
          <span className="flex min-w-0 flex-col items-end">
            <Text as="span" className="text-gray-1000" size="sm">
              Previous
            </Text>
            <Text
              as="span"
              className="text-gray-1200"
              size="sm"
              truncate
              weight="semimedium"
            >
              {previous.name}
            </Text>
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          className="flex min-w-0 flex-1 items-center justify-between rounded-xl bg-preview-bg px-3.5 py-3 shadow-custom transition-[background-color,color,scale] duration-200 ease-out will-change-transform hover:bg-gray-100 active:scale-[0.97]"
          href={`/spinners/${next.slug}`}
        >
          <span className="flex min-w-0 flex-col items-start">
            <Text as="span" className="text-gray-1000" size="sm">
              Next
            </Text>
            <Text
              as="span"
              className="text-gray-1200"
              size="sm"
              truncate
              weight="semimedium"
            >
              {next.name}
            </Text>
          </span>
          <IconArrowRight className="size-4 shrink-0 text-gray-1000" />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
