"use client";

import { IconCircleCheck } from "central-icons/IconCircleCheck";
import { IconSquareBehindSquare1 } from "central-icons-outlined/IconSquareBehindSquare1";
import { AnimatePresence, m } from "motion/react";
import { useCopy } from "@/lib/use-copy";
import { cn } from "@/lib/utils";

const iconTransition = { bounce: 0, duration: 0.3, type: "spring" as const };

const roundedClasses = {
  full: "rounded-full",
  md: "rounded-md",
} as const;

const labels = {
  copied: "Copied",
  failed: "Unable to copy. Select the text and copy it manually",
  idle: "Copy to clipboard",
} as const;

export function CopyButton({
  className,
  iconClassName,
  rounded = "md",
  text,
}: {
  className?: string;
  iconClassName?: string;
  rounded?: keyof typeof roundedClasses;
  text: string;
}) {
  const { copy, status } = useCopy(text);
  const copied = status === "copied";

  return (
    <button
      aria-label={labels[status]}
      className={cn(
        "link-outline group grid size-7 shrink-0 place-items-center transition-[scale,background-color] duration-200 ease-out hover-hover:hover:bg-gray-400 active:scale-[0.97]",
        roundedClasses[rounded],
        className
      )}
      onClick={copy}
      type="button"
    >
      <AnimatePresence initial={false} mode="popLayout">
        <m.span
          animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
          aria-hidden="true"
          exit={{ filter: "blur(4px)", opacity: 0, scale: 0.25 }}
          initial={{ filter: "blur(4px)", opacity: 0, scale: 0.25 }}
          key={copied ? "check" : "copy"}
          transition={iconTransition}
        >
          {copied ? (
            <IconCircleCheck
              className={cn("size-4 text-gray-1000", iconClassName)}
            />
          ) : (
            <IconSquareBehindSquare1
              className={cn(
                "size-4 text-gray-1000 transition-colors duration-200 ease-out group-hover:text-gray-1200",
                iconClassName
              )}
            />
          )}
        </m.span>
      </AnimatePresence>
      <span className="sr-only" role="status">
        {status === "idle" ? "" : labels[status]}
      </span>
    </button>
  );
}
