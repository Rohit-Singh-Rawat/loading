import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      aria-label="Home"
      className={cn(
        "link-outline flex size-8 shrink-0 items-center justify-center rounded-full bg-[#D5D5D5] p-1 dark:bg-[#333]",
        className
      )}
      href="/"
    >
      <div className="flex size-4 size-full items-center justify-center rounded-full bg-[#999] p-1 dark:bg-[#555]">
        <div className="size-full rounded-full bg-[#777]" />
      </div>
    </Link>
  );
}
