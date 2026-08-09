import { IconArrowLeft } from "central-icons-outlined/IconArrowLeft";
import { IconArrowRight } from "central-icons-outlined/IconArrowRight";
import Link from "next/link";
import type { SpinnerItem } from "@/components/spinners";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

const LINK_CLASSNAME =
  "flex min-w-0 flex-1 items-center justify-between rounded-xl border border-gray-400 bg-gray-200 px-3.5 py-3 transition-[background-color,color,scale] duration-200 ease-out will-change-transform hover:bg-gray-300 active:scale-[0.97]";

function PrevNextLink({
  direction,
  item,
}: {
  direction: "next" | "previous";
  item: SpinnerItem;
}) {
  const isPrevious = direction === "previous";
  const Icon = isPrevious ? IconArrowLeft : IconArrowRight;
  const icon = <Icon className="size-4 shrink-0 text-gray-1000" />;

  return (
    <Link className={LINK_CLASSNAME} href={`/spinners/${item.slug}`}>
      {isPrevious && icon}
      <span
        className={cn(
          "flex min-w-0 flex-col",
          isPrevious ? "items-end" : "items-start"
        )}
      >
        <Text as="span" className="text-gray-1000" size="sm">
          {isPrevious ? "Previous" : "Next"}
        </Text>
        <Text
          as="span"
          className="text-gray-1200"
          size="sm"
          truncate
          weight="semimedium"
        >
          {item.name}
        </Text>
      </span>
      {!isPrevious && icon}
    </Link>
  );
}

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
        <PrevNextLink direction="previous" item={previous} />
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <PrevNextLink direction="next" item={next} />
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
