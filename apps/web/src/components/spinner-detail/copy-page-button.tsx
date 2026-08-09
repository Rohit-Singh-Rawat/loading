"use client";

import { IconCircleCheck } from "central-icons/IconCircleCheck";
import { IconSquareBehindSquare1 } from "central-icons-outlined/IconSquareBehindSquare1";
import { Text } from "@/components/ui/text";
import { useCopy } from "@/lib/use-copy";

const labels = {
  copied: "Page copied as Markdown",
  failed: "Unable to copy. Select the page text and copy it manually.",
  idle: "Copy page",
} as const;

export function CopyPageButton({ markdown }: { markdown: string }) {
  const { copy, status } = useCopy(markdown);
  const copied = status === "copied";

  return (
    <div className="flex flex-col gap-1.5">
      <button
        className="link-outline flex h-8 w-full items-center gap-2 rounded-lg bg-gray-100 px-2 outline-light transition-colors duration-150 hover-hover:hover:bg-gray-200"
        onClick={copy}
        type="button"
      >
        <Text as="span" className="flex-1 text-left text-gray-1200" size="sm">
          {copied ? "Copied" : "Copy page"}
        </Text>
        {copied ? (
          <IconCircleCheck className="size-4 shrink-0 text-gray-1000" />
        ) : (
          <IconSquareBehindSquare1 className="size-4 shrink-0 text-gray-1000" />
        )}
      </button>
      {status === "failed" && (
        <Text as="p" className="px-2 text-gray-1000" size="sm">
          {labels.failed}
        </Text>
      )}
      <Text as="span" className="sr-only" role="status" size="sm">
        {status === "idle" ? "" : labels[status]}
      </Text>
    </div>
  );
}
