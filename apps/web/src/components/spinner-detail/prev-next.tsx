import { IconArrowLeft } from "central-icons-outlined/IconArrowLeft";
import { IconArrowRight } from "central-icons-outlined/IconArrowRight";
import Link from "next/link";
import type { SpinnerItem } from "@/components/spinners";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

function PrevNextLink({
  direction,
  item,
}: {
  direction: "next" | "previous";
  item: SpinnerItem;
}) {
  const isPrevious = direction === "previous";
  const Icon = isPrevious ? IconArrowLeft : IconArrowRight;

  return (
    <Link
      className={cn(
        "group flex min-w-0 flex-1 select-none items-center justify-between gap-3 rounded-xl border border-border px-3.5 py-3 transition-colors duration-200 ease-out hover-hover:hover:bg-background-hovered",
        isPrevious ? "flex-row" : "flex-row-reverse"
      )}
      href={`/spinners/${item.slug}`}
    >
      <Icon className="size-4 shrink-0 text-content-subtle transition-colors duration-200 ease-out group-hover:text-content" />
      <span
        className={cn(
          "flex min-w-0 flex-col",
          isPrevious ? "items-end text-end" : "items-start"
        )}
      >
        <Text
          as="span"
          className="text-content-subtle transition-colors duration-200 ease-out group-hover:text-content"
          size="sm"
        >
          {isPrevious ? "Previous" : "Next"}
        </Text>
        <Text as="span" className="w-full text-content" size="sm" truncate>
          {item.name}
        </Text>
      </span>
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
  return (
    <nav aria-label="More spinners" className="flex w-full gap-8">
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
    </nav>
  );
}
