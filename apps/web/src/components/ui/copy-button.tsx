"use client";

import { IconCircleCheck } from "central-icons/IconCircleCheck";
import { IconSquareBehindSquare1 } from "central-icons-outlined/IconSquareBehindSquare1";
import { AnimatePresence, m } from "motion/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const iconTransition = { bounce: 0, duration: 0.3, type: "spring" as const };

const roundedClasses = {
  full: "rounded-full",
  md: "rounded-md",
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
  const [status, setStatus] = useState<"copied" | "failed" | "idle">("idle");
  const timeoutRef = useRef<number | null>(null);
  const copied = status === "copied";

  async function handleCopy() {
    let next: "copied" | "failed" = "copied";
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      next = "failed";
    }
    setStatus(next);
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => setStatus("idle"), 2000);
  }

  let buttonLabel = "Copy to clipboard";
  if (copied) {
    buttonLabel = "Copied";
  } else if (status === "failed") {
    buttonLabel = "Unable to copy. Select the text and copy it manually";
  }

  return (
    <button
      aria-label={buttonLabel}
      className={cn(
        "link-outline group grid size-7 shrink-0 place-items-center transition-[scale,background-color] duration-200 ease-out hover-hover:hover:bg-gray-400 active:scale-[0.97]",
        roundedClasses[rounded],
        className
      )}
      onClick={handleCopy}
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
        {status === "idle" ? "" : buttonLabel}
      </span>
    </button>
  );
}
