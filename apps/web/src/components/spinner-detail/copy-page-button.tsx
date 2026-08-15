"use client";

import { IconChevronDownMedium } from "central-icons/IconChevronDownMedium";
import { IconClaudeai } from "central-icons/IconClaudeai";
import { IconMarkdown } from "central-icons/IconMarkdown";
import { IconOpenai } from "central-icons/IconOpenai";
import { IconSquareBehindSquare1 } from "central-icons/IconSquareBehindSquare1";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Text } from "@/components/ui/text";
import { DOMAIN } from "@/lib/constants";
import { useCopy } from "@/lib/use-copy";

const messages = {
  copied: "Page copied as Markdown",
  failed: "Unable to copy. Select the page text and copy it manually.",
} as const;

function assistantPrompt(markdownUrl: string) {
  return encodeURIComponent(
    `Read ${markdownUrl} so I can ask questions about it.`
  );
}

export function CopyPageButton({
  markdown,
  slug,
}: {
  markdown: string;
  slug: string;
}) {
  const { copy, status } = useCopy();
  const markdownPath = `/spinners/${slug}/markdown`;
  const markdownUrl = `${DOMAIN}${markdownPath}`;

  return (
    <div className="flex flex-col gap-1.5">
      <DropdownMenu>
        <DropdownMenuTrigger className="link-outline group flex h-8 w-full cursor-pointer items-center gap-2 rounded-lg bg-popover px-3 shadow-custom transition-colors duration-200 hover-hover:hover:bg-popover-hovered">
          <Text
            as="span"
            className="flex-1 text-left text-content"
            size="sm"
            weight="medium"
          >
            Copy page
          </Text>
          <IconChevronDownMedium className="size-4 text-content-subtle transition-transform duration-200 ease-out group-data-popup-open:rotate-180" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-(--anchor-width)">
          <DropdownMenuItem onClick={() => copy(markdown)}>
            <IconSquareBehindSquare1 />
            Copy to clipboard
          </DropdownMenuItem>
          <DropdownMenuItem
            render={<a href={markdownPath} rel="noreferrer" target="_blank" />}
          >
            <IconMarkdown />
            View as markdown
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            render={
              <a
                href={`https://chatgpt.com/?hints=search&q=${assistantPrompt(markdownUrl)}`}
                rel="noreferrer"
                target="_blank"
              />
            }
          >
            <IconOpenai />
            Open in ChatGPT
          </DropdownMenuItem>
          <DropdownMenuItem
            render={
              <a
                href={`https://claude.ai/new?q=${assistantPrompt(markdownUrl)}`}
                rel="noreferrer"
                target="_blank"
              />
            }
          >
            <IconClaudeai />
            Open in Claude
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {status === "failed" && (
        <Text as="p" className="px-2 text-content-subtle" size="sm">
          {messages.failed}
        </Text>
      )}
      <Text as="span" className="sr-only" role="status" size="sm">
        {status === "idle" ? "" : messages[status]}
      </Text>
    </div>
  );
}
