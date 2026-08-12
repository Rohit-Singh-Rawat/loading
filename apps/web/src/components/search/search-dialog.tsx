"use client";

import { Dialog } from "@base-ui/react/dialog";
import { ScrollArea } from "@base-ui/react/scroll-area";
import { IconCircleX } from "central-icons/IconCircleX";
import { IconArrowCornerDownLeft } from "central-icons-outlined/IconArrowCornerDownLeft";
import { IconArrowDown } from "central-icons-outlined/IconArrowDown";
import { IconArrowRight } from "central-icons-outlined/IconArrowRight";
import { IconArrowUp } from "central-icons-outlined/IconArrowUp";
import { IconMagnifyingGlass } from "central-icons-outlined/IconMagnifyingGlass";
import { Command, useCommandState } from "cmdk";
import { usePathname, useRouter } from "next/navigation";
import { type RefObject, useRef, useState } from "react";
import { AVAILABLE_SPINNERS } from "@/components/spinners";
import { Kbd } from "@/components/ui/kbd";
import { useKeysPressed } from "@/lib/use-keys-pressed";
import { cn } from "@/lib/utils";

const ROWS: { href: string; keywords?: string[]; title: string }[] = [
  { href: "/", title: "Overview" },
  ...AVAILABLE_SPINNERS.map((item) => ({
    href: `/spinners/${item.slug}`,
    keywords: [item.slug],
    title: item.name,
  })),
];

const ITEM_CLASSNAME =
  "group flex h-10 cursor-pointer select-none items-center gap-2.5 rounded-[10px] px-2.5 text-content text-[13px] data-[selected=true]:bg-background";

export function SearchDialog({
  onOpenChange,
  open,
  returnFocusRef,
}: {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  returnFocusRef: RefObject<HTMLElement | null>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigatedRef = useRef(false);
  const pendingHrefRef = useRef<string | null>(null);

  const [query, setQuery] = useState("");
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setQuery("");
      pendingHrefRef.current = null;
    }
  }

  // Navigate once the dialog has finished closing, so the exit transition
  // doesn't run against a page swap.
  const navigateTo = (href: string) => {
    navigatedRef.current = true;
    pendingHrefRef.current = href;
    if (href !== pathname) {
      router.prefetch(href);
    }
    onOpenChange(false);
  };

  const runPendingNavigation = () => {
    const href = pendingHrefRef.current;
    if (!href) {
      return;
    }
    pendingHrefRef.current = null;
    router.push(href);
  };

  return (
    <Dialog.Root
      onOpenChange={onOpenChange}
      onOpenChangeComplete={(isOpen) => {
        if (!isOpen) {
          runPendingNavigation();
        }
      }}
      open={open}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 dark:bg-black/30" />
        <Dialog.Popup
          className={cn(
            "fixed top-[18%] left-1/2 z-50 w-[calc(100vw-2.5rem)] max-w-180 -translate-x-1/2",
            "overflow-clip rounded-2xl bg-popover shadow-custom outline-hidden",
            "transition-[transform,scale,opacity] duration-150 ease-out",
            "data-starting-style:scale-95 data-starting-style:opacity-0",
            "data-ending-style:scale-95 data-ending-style:opacity-0"
          )}
          finalFocus={() => {
            if (navigatedRef.current) {
              navigatedRef.current = false;
              return false;
            }
            const element = returnFocusRef.current;
            return element?.isConnected ? element : false;
          }}
          initialFocus={inputRef}
        >
          <Dialog.Title className="sr-only">Search spinners</Dialog.Title>

          <Command label="Search spinners">
            <div className="px-1.5 pt-1.5">
              <div className="flex h-10 items-center gap-2.5 rounded-[10px] bg-background px-2.5">
                <IconMagnifyingGlass className="size-4 shrink-0 text-content-subtle" />
                <div className="h-full min-w-0 flex-1">
                  <Command.Input
                    className="h-full w-[calc(100%/0.8125)] origin-left scale-[0.8125] bg-transparent text-base text-content leading-[calc(1.125/0.8125)] outline-none placeholder:text-content-subtle sm:w-full sm:scale-100 sm:text-[13px]"
                    onValueChange={setQuery}
                    placeholder="Search spinners…"
                    ref={inputRef}
                    value={query}
                  />
                </div>
              </div>
            </div>

            <ScrollArea.Root className="relative py-1.5">
              <ScrollArea.Viewport
                render={
                  <Command.List className="h-(--cmdk-list-height) max-h-90 px-1.5 transition-[height] duration-150 ease-out" />
                }
              >
                <EmptyRow
                  onClearQuery={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                />

                {ROWS.map((row) => (
                  <Command.Item
                    className={ITEM_CLASSNAME}
                    key={row.href}
                    keywords={row.keywords}
                    onSelect={() => navigateTo(row.href)}
                    value={row.title}
                  >
                    <IconArrowRight className="size-4 shrink-0 text-content-subtle group-data-[selected=true]:text-content" />
                    <span className="truncate font-medium">{row.title}</span>
                  </Command.Item>
                ))}
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                className="my-1.5 me-px w-1.5 opacity-0 transition-opacity duration-100 ease-out data-hovering:opacity-100 data-scrolling:opacity-100"
                orientation="vertical"
              >
                <ScrollArea.Thumb className="w-full rounded-full bg-content-subtle/40" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>

            <SearchFooter />
          </Command>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function EmptyRow({ onClearQuery }: { onClearQuery: () => void }) {
  const isEmpty = useCommandState((state) => state.filtered.count === 0);

  if (!isEmpty) {
    return null;
  }

  return (
    <Command.Item
      className={cn(ITEM_CLASSNAME, "justify-between")}
      forceMount
      onSelect={onClearQuery}
      value="no-results-clear-search"
    >
      <span className="flex items-center gap-2.5">
        <IconCircleX className="size-4 shrink-0 text-content-subtle" />
        <span className="font-medium">No results found</span>
      </span>
      <span className="font-medium text-content-subtle">Clear search</span>
    </Command.Item>
  );
}

const FOOTER_KEYS = ["arrowup", "arrowdown", "enter", "escape"] as const;

function SearchFooter() {
  const pressed = useKeysPressed(FOOTER_KEYS);

  return (
    <div
      aria-hidden
      className="hidden items-center justify-end border-border border-t bg-background-subtle px-3.5 py-2.5 text-content-subtle text-xs sm:flex"
    >
      <div className="flex select-none items-center gap-4">
        <span className="flex items-center gap-1.5">
          <span className="flex items-center gap-1">
            <Kbd pressed={pressed.arrowup} variant="raised">
              <IconArrowUp className="size-3" />
            </Kbd>
            <Kbd pressed={pressed.arrowdown} variant="raised">
              <IconArrowDown className="size-3" />
            </Kbd>
          </span>
          to navigate
        </span>
        <span className="flex items-center gap-1.5">
          <Kbd pressed={pressed.enter} variant="raised">
            <IconArrowCornerDownLeft className="size-3" />
          </Kbd>
          to select
        </span>
        <span className="flex items-center gap-1.5 leading-none">
          <Kbd
            className="px-1.5"
            pressed={pressed.escape}
            uppercase={false}
            variant="raised"
          >
            <span className="mb-px">esc</span>
          </Kbd>
          to close
        </span>
      </div>
    </div>
  );
}
