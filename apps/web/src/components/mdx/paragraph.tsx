import type { ComponentPropsWithoutRef } from "react";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

export function MDXParagraph({
  className,
  ...rest
}: ComponentPropsWithoutRef<"p">) {
  return (
    <Text
      className={cn("text-content-subtle sm:px-4", className)}
      size="base"
      {...rest}
    />
  );
}
