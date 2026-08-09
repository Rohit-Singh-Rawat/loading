import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      aria-label="Home"
      className={cn(
        "link-outline flex size-8 shrink-0 items-center justify-center rounded-full bg-orange",
        className
      )}
      href="/"
    />
  );
}
