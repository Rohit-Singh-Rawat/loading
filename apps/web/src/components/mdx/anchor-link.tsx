"use client";

import { IconChainLink4 } from "central-icons/IconChainLink4";
import { IconCircleCheck } from "central-icons/IconCircleCheck";
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
      className="link-outline absolute top-1/2 -left-7 flex size-6 -translate-y-1/2 items-center justify-center rounded opacity-0 transition-opacity duration-200 ease-out before:absolute before:-inset-1.5 before:content-[''] focus-visible:opacity-100 group-hover:opacity-100"
      href={`#${id}`}
      onClick={copyHref}
    >
      <AnimatedIcon
        active={status === "copied"}
        activeIcon={<IconCircleCheck className="size-4 text-content-subtle" />}
        idleIcon={
          <IconChainLink4 className="mb-px size-4 text-content-subtle" />
        }
      />
    </a>
  );
}
