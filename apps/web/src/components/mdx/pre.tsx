import type { ComponentPropsWithoutRef } from "react";
import { PRE_CLASSES } from "@/lib/code-block";
import { cn } from "@/lib/utils";

export function MDXPre({
  className,
  ...rest
}: ComponentPropsWithoutRef<"pre">) {
  return <pre className={cn(PRE_CLASSES, className)} {...rest} />;
}
