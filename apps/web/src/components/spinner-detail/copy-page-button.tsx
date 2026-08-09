"use client";

import { IconCircleCheck } from "central-icons/IconCircleCheck";
import { IconSquareBehindSquare1 } from "central-icons-outlined/IconSquareBehindSquare1";
import { useRef, useState } from "react";
import { Text } from "@/components/ui/text";

const RESET_DELAY_MS = 2000;

type CopyStatus = "copied" | "failed" | "idle";

export function CopyPageButton({ markdown }: { markdown: string }) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timeoutRef = useRef<number | null>(null);

  async function handleCopy() {
    let next: CopyStatus = "copied";
    try {
      await navigator.clipboard.writeText(markdown);
    } catch {
      next = "failed";
    }
    setStatus(next);
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(
      () => setStatus("idle"),
      RESET_DELAY_MS
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <button
        className="link-outline flex h-8 w-full items-center gap-2 rounded-lg bg-gray-100 px-2 outline-light transition-colors duration-150 hover-hover:hover:bg-gray-200"
        onClick={handleCopy}
        type="button"
      >
        <Text as="span" className="flex-1 text-left text-gray-1200" size="sm">
          {status === "copied" ? "Copied" : "Copy page"}
        </Text>
        {status === "copied" ? (
          <IconCircleCheck className="size-4 shrink-0 text-gray-1000" />
        ) : (
          <IconSquareBehindSquare1 className="size-4 shrink-0 text-gray-1000" />
        )}
      </button>
      {status === "failed" && (
        <Text as="p" className="px-2 text-gray-1000" size="sm">
          Unable to copy. Select the page text and copy it manually.
        </Text>
      )}
      <Text as="span" className="sr-only" role="status" size="sm">
        {status === "copied" ? "Page copied as Markdown" : ""}
      </Text>
    </div>
  );
}
