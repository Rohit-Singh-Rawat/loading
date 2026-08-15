"use client";

import { IconChainLink4 } from "central-icons/IconChainLink4";
import { IconCircleCheck } from "central-icons/IconCircleCheck";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { Heading } from "@/components/ui/heading";
import { useCopy } from "@/lib/use-copy";
import { cn } from "@/lib/utils";

function AnchoredHeading({
  as,
  children,
  className,
  id,
  size,
}: {
  as: "h2" | "h3";
  children: ReactNode;
  className: string;
  id?: string;
  size: 5 | 6;
}) {
  const { copy, status } = useCopy(
    () => `${window.location.origin}${window.location.pathname}#${id}`
  );

  const heading = cn("w-fit scroll-mt-20", className);

  if (!id) {
    return (
      <Heading as={as} className={heading} size={size} weight="semibold">
        {children}
      </Heading>
    );
  }

  return (
    <Heading as={as} className={heading} id={id} size={size} weight="semibold">
      <button
        className="group relative -ml-7 cursor-pointer pl-7 text-left before:absolute before:-inset-1 before:content-['']"
        onClick={copy}
        type="button"
      >
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-0 flex size-6 -translate-y-1/2 items-center justify-center opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
        >
          <AnimatedIcon
            active={status === "copied"}
            activeIcon={
              <IconCircleCheck className="size-4 text-content-subtle" />
            }
            idleIcon={
              <IconChainLink4 className="mb-px size-4 text-content-subtle" />
            }
          />
        </span>
        {children}
      </button>
    </Heading>
  );
}

export function MDXHeading({ children, id }: ComponentPropsWithoutRef<"h2">) {
  return (
    <AnchoredHeading as="h2" className="mt-16 mb-2" id={id} size={5}>
      {children}
    </AnchoredHeading>
  );
}

export function MDXSubheading({
  children,
  id,
}: ComponentPropsWithoutRef<"h3">) {
  return (
    <AnchoredHeading as="h3" className="mt-6 mb-1" id={id} size={6}>
      {children}
    </AnchoredHeading>
  );
}
