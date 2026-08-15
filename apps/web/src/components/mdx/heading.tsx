import type { ReactNode } from "react";
import { Heading } from "@/components/ui/heading";

export function MDXHeading({
  children,
  ...rest
}: {
  children: ReactNode;
} & Record<string, unknown>) {
  return (
    <Heading as="h2" className="mt-8 mb-1" size={4} weight="medium" {...rest}>
      {children}
    </Heading>
  );
}

export function MDXSubheading({
  children,
  ...rest
}: {
  children: ReactNode;
} & Record<string, unknown>) {
  return (
    <Heading
      as="h3"
      className="mt-6 mb-1 font-berkeley-mono"
      size={6}
      weight="medium"
      {...rest}
    >
      {children}
    </Heading>
  );
}
