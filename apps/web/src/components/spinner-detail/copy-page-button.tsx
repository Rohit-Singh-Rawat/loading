"use client";

import { IconCircleCheck } from "central-icons/IconCircleCheck";
import { IconSquareBehindSquare1 } from "central-icons-outlined/IconSquareBehindSquare1";
import { TextMorph } from "torph/react";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { Text } from "@/components/ui/text";
import { useCopy } from "@/lib/use-copy";

const messages = {
  copied: "Page copied as Markdown",
  failed: "Unable to copy. Select the page text and copy it manually.",
} as const;

export function CopyPageButton({ markdown }: { markdown: string }) {
  const { copy, status } = useCopy(markdown);
  const copied = status === "copied";
  const label = copied ? "Copied page" : "Copy page";

  return (
    <div className="flex flex-col gap-1.5">
      <button
        aria-label={label}
        className="link-outline flex h-8 w-full items-center gap-2 rounded-lg bg-gray-100 px-3 outline-light transition-colors duration-200 hover-hover:hover:bg-gray-200"
        onClick={copy}
        type="button"
      >
        <AnimatedIcon
          active={copied}
          activeIcon={<IconCircleCheck className="size-4 text-gray-1000" />}
          idleIcon={
            <IconSquareBehindSquare1 className="size-4 text-gray-1000" />
          }
        />
        {/* `flex-1` + `text-right` anchors the label's right edge, so the morph
            grows leftward into the empty space instead of shifting the text. */}
        <Text
          aria-hidden="true"
          as="span"
          className="flex-1 text-right text-gray-1200"
          size="sm"
        >
          <TextMorph>{label}</TextMorph>
        </Text>
      </button>
      {status === "failed" && (
        <Text as="p" className="px-2 text-gray-1000" size="sm">
          {messages.failed}
        </Text>
      )}
      <Text as="span" className="sr-only" role="status" size="sm">
        {status === "idle" ? "" : messages[status]}
      </Text>
    </div>
  );
}
