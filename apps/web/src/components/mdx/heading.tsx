import type { ReactNode } from "react";
import { Heading } from "@/components/ui/heading";
import { SCROLL_MARGIN } from "@/lib/scroll-offset";
import { cn } from "@/lib/utils";

export function MDXHeading({
  children,
  ...rest
}: {
  children: ReactNode;
} & Record<string, unknown>) {
  return (
    <Heading
      as="h2"
      className={cn("mt-8 mb-1", SCROLL_MARGIN)}
      size={4}
      weight="medium"
      {...rest}
    >
      {children}
    </Heading>
  );
}
