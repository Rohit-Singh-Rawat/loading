import type { ComponentPropsWithoutRef } from "react";
import { Heading } from "@/components/ui/heading";

export function MDXHeading(props: ComponentPropsWithoutRef<"h2">) {
  return (
    <Heading
      as="h2"
      className="mt-8 mb-1"
      size={5}
      weight="semibold"
      {...props}
    />
  );
}

export function MDXSubheading(props: ComponentPropsWithoutRef<"h3">) {
  return (
    <Heading
      as="h3"
      className="mt-6 mb-1"
      size={6}
      weight="semibold"
      {...props}
    />
  );
}
