"use client";

import { IconCrossMedium } from "central-icons-outlined/IconCrossMedium";
import { IconMagnifyingGlass } from "central-icons-outlined/IconMagnifyingGlass";
import { AnimatePresence, m } from "motion/react";
import { useRef, useState } from "react";

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
      <input
        aria-label="Search spinners"
        className="w-full min-w-0 rounded-none bg-transparent font-normal text-gray-1200 text-sm outline-none placeholder:text-gray-1000 [&::-webkit-search-cancel-button]:hidden"
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search"
        ref={inputRef}
        type="search"
        value={value}
      />
      <AnimatePresence initial={false}>
        {value && (
          <m.button
            animate={{ opacity: 1 }}
            aria-label="Clear search"
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
