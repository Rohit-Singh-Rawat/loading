import Link from "next/link";
import type { SpinnerItem } from "@/components/spinners";
import { Text } from "@/components/ui/text";

export function SpinnerCard({ item }: { item: SpinnerItem }) {
  const Spinner = item.component;

  return (
    <Link className="link-outline rounded-3xl" href={`/spinners/${item.slug}`}>
      <div className="relative flex h-52 flex-col items-center justify-center rounded-3xl bg-gray-200 transition-colors duration-200 ease-out hover:bg-gray-300">
        <div className="mt-4 flex h-full w-full items-center justify-center">
          {Spinner ? <Spinner size={40} /> : null}
        </div>
        <Text
          as="span"
          className="w-full p-4 text-center text-gray-1000 lowercase"
          size="sm"
        >
          {item.name}
        </Text>
      </div>
    </Link>
  );
}
