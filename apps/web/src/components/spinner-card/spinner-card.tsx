import Link from "next/link";
import type { SpinnerItem } from "@/components/spinners";
import { Text } from "@/components/ui/text";

export function SpinnerCard({ item }: { item: SpinnerItem }) {
  const Spinner = item.component;

  return (
    <Link
      className="link-outline group rounded-2xl"
      href={`/spinners/${item.slug}`}
    >
      <div className="relative flex h-52 flex-col items-center justify-center rounded-2xl border border-border bg-background p-1 transition-colors duration-200 ease-out group-hover:bg-background-hovered">
        <div className="mt-4 flex h-full w-full items-center justify-center">
          <Spinner size={40} />
        </div>
        <div className="w-full rounded-xl border border-border bg-background px-2 py-1.5 text-center font-berkeley-mono lowercase transition-colors duration-200 ease-out group-hover:text-content">
          <Text as="span" className="text-[13px] text-content-subtle">
            {item.name}
          </Text>
        </div>
      </div>
    </Link>
  );
}
