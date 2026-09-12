import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function CodePanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl bg-background-subtle",
        className
      )}
    >
      {children}
    </div>
  );
}
