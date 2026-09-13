import { SPINNERS } from "loading-dev";
import Link from "next/link";
import type { SpinnerItem } from "@/components/spinners";
import { Text } from "@/components/ui/text";

export function SpinnerCard({ item }: { item: SpinnerItem }) {
  const Spinner = SPINNERS[item.slug];

  return (
    <Link className="link-outline group rounded-3xl" href={item.href}>
      <div className="relative flex h-52 flex-col items-center justify-center rounded-3xl bg-background-subtle p-1 transition-colors duration-200 ease-out group-hover:bg-background">
        <div className="mt-4 flex h-full w-full items-center justify-center">
          <Spinner size={24} />
        </div>
        <div className="w-full px-2 py-1.5 text-center">
          <Text
            as="span"
            className="font-semimedium text-[13px] text-content-subtle"
          >
            {item.name}
          </Text>
        </div>
      </div>
    </Link>
  );
}
