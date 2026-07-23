import Link from "next/link";
import type { SpinnerItem } from "@/components/spinners";

export function SpinnerCard({ item }: { item: SpinnerItem }) {
  const Spinner = item.component;

  return (
    <Link
      className="link-outline rounded-[20px]"
      href={`/spinners/${item.slug}`}
    >
      <div className="relative flex h-[208px] items-center justify-center rounded-[20px] bg-gray-100 outline-light transition-colors duration-150 hover:bg-gray-200">
        {Spinner ? <Spinner size={16} /> : null}
        <span className="absolute inset-x-0 bottom-6 text-center text-[13px] text-gray-1000 leading-5">
          {item.name.toLowerCase()}
        </span>
      </div>
    </Link>
  );
}
