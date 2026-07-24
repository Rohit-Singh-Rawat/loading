"use client";

import { IconChevronDownMedium } from "central-icons/IconChevronDownMedium";
import { IconCircleCheck } from "central-icons/IconCircleCheck";
import { IconSquareBehindSquare1 } from "central-icons/IconSquareBehindSquare1";
import { useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Text } from "@/components/ui/text";

export function CopyPageDropdown({ markdown }: { markdown: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(markdown);
    } catch {
      return;
    }
    setCopied(true);
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="link-outline flex h-8 w-full items-center gap-2 rounded-lg bg-gray-100 pl-2 outline-light transition-colors duration-150 hover-hover:hover:bg-gray-200">
        <Text as="span" className="flex-1 text-left text-gray-1200" size="sm">
          Copy page
        </Text>
        <span className="h-8 w-px shrink-0 bg-preview-border" />
        <span className="flex h-8 w-8 items-center justify-center">
          <IconChevronDownMedium className="size-[15px] text-gray-1000" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-(--anchor-width)"
        sideOffset={6}
      >
        <DropdownMenuItem onClick={handleCopy}>
          {copied ? <IconCircleCheck /> : <IconSquareBehindSquare1 />}
          {copied ? "Copied" : "Copy page as Markdown"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
