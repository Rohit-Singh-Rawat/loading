import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AsideShell({
  children,
  sticky = true,
}: {
  children?: ReactNode;
  sticky?: boolean;
}) {
  return (
    <aside className="hidden w-60 shrink-0 xl:block">
      <div className={cn("flex flex-col gap-4", sticky && "sticky top-20")}>
        {children}
      </div>
    </aside>
  );
}
