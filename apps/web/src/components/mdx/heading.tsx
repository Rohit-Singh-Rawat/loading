import type { ComponentPropsWithoutRef } from "react";
import { AnchorLink } from "@/components/mdx/anchor-link";
import { Heading } from "@/components/ui/heading";

export function MDXHeading({ children, id }: ComponentPropsWithoutRef<"h2">) {
  return (
    <Heading
      as="h2"
      className="group relative ms-4 mt-16 mb-1 w-fit scroll-mt-20"
      id={id}
      size={4}
      weight="semibold"
    >
      {id ? <AnchorLink id={id} /> : null}
      {children}
    </Heading>
  );
}
