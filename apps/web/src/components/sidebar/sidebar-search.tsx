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
      <Kbd pressed={pressed.meta}>⌘</Kbd>
      <Kbd pressed={pressed.k}>K</Kbd>
    </span>
  );
}

export function SidebarSearch() {
  const context = useSearchContext();
  if (!context) {
    return null;
  }
  const { isSearchOpen, openSearch } = context;

  return (
    <button
      aria-keyshortcuts="Meta+K"
      className="flex h-8 w-full items-center gap-2 rounded-lg bg-popover px-2 text-left shadow-custom transition-colors duration-200 ease-out hover-hover:hover:bg-background-subtle"
      onClick={openSearch}
      type="button"
    >
      <IconMagnifyingGlass
        aria-hidden="true"
        className="size-4 shrink-0 text-content-subtle"
      />
      <span className="min-w-0 flex-1 truncate text-content-subtle text-sm">
        Search
      </span>
      <SearchShortcutHint enabled={!isSearchOpen} />
    </button>
  );
}
