import type { ReactNode } from "react";
import { PRE_CLASSES } from "@/lib/code-block";
import { cn } from "@/lib/utils";

export function MDXPre({
  children,
  className,
  ...rest
}: {
  children: ReactNode;
  className?: string;
} & Record<string, unknown>) {
  return (
    <pre className={cn(PRE_CLASSES, className)} {...rest}>
      {children}
    </pre>
  );
}
