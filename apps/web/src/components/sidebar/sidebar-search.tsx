"use client";

import { IconMagnifyingGlass } from "central-icons-outlined/IconMagnifyingGlass";
import { useSearchContext } from "@/components/search/search-context";
import { Kbd } from "@/components/ui/kbd";
import { useKeysPressed } from "@/lib/use-keys-pressed";

const SHORTCUT_KEYS = ["meta", "k"] as const;

function SearchShortcutHint({ enabled }: { enabled: boolean }) {
  const pressed = useKeysPressed(SHORTCUT_KEYS, enabled);

  return (
    <span aria-hidden className="flex items-center gap-0.5">
      <Kbd className="pt-[0.5px]" pressed={pressed.meta}>
        ⌘
      </Kbd>
      <Kbd pressed={pressed.k}>K</Kbd>
    </span>
  );
}

export function SidebarSearch() {
  const { isSearchOpen, openSearch } = useSearchContext();

  return (
    <button
      aria-keyshortcuts="Meta+K"
      className="flex h-8 w-full items-center gap-2 rounded-lg border border-border bg-background pr-1.5 pl-2 text-left transition-colors duration-200 ease-out hover-hover:hover:bg-background-hovered"
      onClick={openSearch}
      type="button"
    >
      <IconMagnifyingGlass
        aria-hidden="true"
        className="size-4 shrink-0 text-content-subtle"
      />
      <span className="min-w-0 flex-1 truncate font-[450] text-content-subtle text-sm">
        Search
      </span>
      <SearchShortcutHint enabled={!isSearchOpen} />
    </button>
  );
}
