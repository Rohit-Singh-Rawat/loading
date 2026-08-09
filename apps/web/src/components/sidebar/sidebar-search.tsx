"use client";

import { IconCrossMedium } from "central-icons-outlined/IconCrossMedium";
import { IconMagnifyingGlass } from "central-icons-outlined/IconMagnifyingGlass";
import { AnimatePresence, m } from "motion/react";
import { useRef, useState } from "react";
import { Text } from "@/components/ui/text";

// Matches the spring the other icon transitions in the app use.
const CLEAR_TRANSITION = { bounce: 0, duration: 0.3, type: "spring" } as const;

export function SidebarSearch() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  function clear() {
    setValue("");
    inputRef.current?.focus();
  }

  return (
    <div className="flex h-8 w-full items-center gap-2 rounded-lg border border-gray-400 bg-gray-300 px-2 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-gray-1100 has-[input:focus-visible]:outline-offset-0">
      <IconMagnifyingGlass
        aria-hidden="true"
        className="size-4 shrink-0 text-gray-1000"
      />
      <Text
        aria-label="Search spinners"
        as="input"
        className="w-full min-w-0 rounded-none bg-transparent text-gray-1200 outline-none placeholder:text-gray-1000 [&::-webkit-search-cancel-button]:hidden"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setValue(event.target.value)
        }
        placeholder="Search"
        ref={inputRef}
        size="sm"
        type="search"
        value={value}
      />
      <AnimatePresence initial={false}>
        {value && (
          <m.button
            animate={{ opacity: 1 }}
            aria-label="Clear search"
            // Opacity is driven by motion, so it is deliberately absent from the
            // CSS transition list — otherwise both would drive the same
            // property and the fade would lag a frame behind.
            // `after` extends the 20px circle to a 24px target without
            // changing how it looks.
            className="relative -mr-1 grid size-5 shrink-0 place-items-center rounded-full bg-gray-200 text-gray-1000 transition-[background-color,color] duration-200 ease-out after:absolute after:-inset-0.5 after:content-[''] hover-hover:hover:text-gray-1200"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            key="clear-search"
            onClick={clear}
            transition={CLEAR_TRANSITION}
            type="button"
          >
            <IconCrossMedium aria-hidden="true" className="size-3.5" />
          </m.button>
        )}
      </AnimatePresence>
    </div>
  );
}
