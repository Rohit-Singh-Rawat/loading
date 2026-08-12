import Link from "next/link";
import type { SpinnerItem } from "@/components/spinners";
import { Text } from "@/components/ui/text";

export function SpinnerCard({ item }: { item: SpinnerItem }) {
  const Spinner = item.component;

  return (
    <Link
      className="link-outline group rounded-3xl"
      href={`/spinners/${item.slug}`}
    >
      <div className="relative flex h-52 flex-col items-center justify-center rounded-3xl border border-border bg-background transition-colors duration-200 ease-out group-hover:bg-background-hovered">
        <div className="mt-4 flex h-full w-full items-center justify-center">
          <Spinner size={40} />
        </div>
        <Text
          as="span"
          className="w-full p-4 text-center text-content-subtle lowercase transition-colors duration-200 ease-out group-hover:text-content"
          size="sm"
        >
          {item.name}
        </Text>
      </div>
    </Link>
  );
}
