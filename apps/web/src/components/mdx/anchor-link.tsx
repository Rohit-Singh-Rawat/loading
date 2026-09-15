"use client";

import { CheckCircledIcon, Link2Icon } from "@radix-ui/react-icons";
import type { MouseEvent } from "react";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { useCopy } from "@/lib/use-copy";

export function AnchorLink({ id }: { id: string }) {
  const { copy, status } = useCopy();

  function copyHref(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    copy(event.currentTarget.href);
  }

  return (
    <a
      aria-label="Copy link to this section"
      className="absolute top-1/2 -left-7 flex size-6 -translate-y-1/2 items-center justify-center rounded opacity-0 transition-opacity duration-200 ease-out before:absolute before:-inset-1.5 before:content-[''] focus-visible:opacity-100 group-hover:opacity-100"
      href={`#${id}`}
      onClick={copyHref}
    >
      <AnimatedIcon
        active={status === "copied"}
        activeIcon={<CheckCircledIcon className="size-4 text-content-subtle" />}
        idleIcon={<Link2Icon className="mb-px size-4 text-content-subtle" />}
      />
    </a>
  );
}
