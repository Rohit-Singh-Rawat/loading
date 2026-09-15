"use client";

import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Kbd } from "@/components/ui/kbd";
import { LogoMark } from "@/components/ui/logo";
import { useKeysPressed } from "@/lib/use-keys-pressed";

const FOOTER_KEYS = ["arrowup", "arrowdown", "enter", "escape"] as const;

function ReturnIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 15 15"
    >
      <path d="M11.5 3.75v4.5h-8M6 5.75 3.5 8.25 6 10.75" />
    </svg>
  );
}

export function SearchFooter() {
  const pressed = useKeysPressed(FOOTER_KEYS);

  return (
    <div
      aria-hidden
      className="hidden items-center justify-between border-border border-t bg-background-subtle p-3 text-[13px] text-content-subtle sm:flex"
    >
      <LogoMark className="size-4.5 text-orange" />
      <div className="flex select-none items-center gap-4">
        <span className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <Kbd pressed={pressed.arrowdown}>
              <ArrowDownIcon className="size-3" />
            </Kbd>
            <Kbd pressed={pressed.arrowup}>
              <ArrowUpIcon className="size-3" />
            </Kbd>
          </span>
          Navigate
        </span>
        <span className="flex items-center gap-2">
          <Kbd pressed={pressed.enter}>
            <ReturnIcon className="size-3" />
          </Kbd>
          Select
        </span>
        <span className="flex items-center gap-2 leading-none">
          <Kbd className="px-1.5" pressed={pressed.escape} uppercase={false}>
            <span className="mb-px">esc</span>
          </Kbd>
          Close
        </span>
      </div>
    </div>
  );
}
