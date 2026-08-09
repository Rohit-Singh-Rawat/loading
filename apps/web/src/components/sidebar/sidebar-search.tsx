"use client";

import { IconCrossMedium } from "central-icons-outlined/IconCrossMedium";
import { IconMagnifyingGlass } from "central-icons-outlined/IconMagnifyingGlass";
import { useRef, useState } from "react";
import { Text } from "@/components/ui/text";

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
      {value && (
        <button
          aria-label="Clear search"
          className="shrink-0 text-gray-1000 hover-hover:hover:text-gray-1200"
          onClick={clear}
          type="button"
        >
          <IconCrossMedium aria-hidden="true" className="size-4" />
        </button>
      )}
    </div>
  );
}
