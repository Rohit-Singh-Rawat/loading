import Link from "next/link";
import type { SpinnerItem } from "@/components/spinners";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

function PrevNextLink({
  align,
  item,
  label,
}: {
  align: "end" | "start";
  item: SpinnerItem;
  label: string;
}) {
  return (
    <Link
      className={cn(
        "group flex max-w-40 select-none flex-col gap-1 sm:max-w-80",
        align === "start" ? "items-start" : "items-end"
      )}
      href={`/spinners/${item.slug}`}
    >
      <Text
        as="span"
        className="text-content-subtle transition-colors duration-200 ease-out group-hover:text-content"
        size="sm"
        weight="medium"
      >
        {label}
      </Text>
      <Text
        as="span"
        className="w-full text-content"
        size="sm"
        truncate
        weight="medium"
      >
        {item.name}
      </Text>
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
    <nav
      aria-label="More spinners"
      className="flex w-full items-center justify-between"
    >
      {previous ? (
        <PrevNextLink align="start" item={previous} label="Previous" />
      ) : (
        <div />
      )}
      {next ? <PrevNextLink align="end" item={next} label="Next" /> : <div />}
    </nav>
  );
}
