"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { SearchContext } from "@/components/search/search-context";
import { SearchDialog } from "@/components/search/search-dialog";

export function SearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const openSearch = () => {
    const active = document.activeElement;
    returnFocusRef.current =
      active instanceof HTMLElement && active !== document.body ? active : null;
    setOpen(true);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        if (open) {
          setOpen(false);
        } else {
          openSearch();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, openSearch]);

  return (
    <SearchContext.Provider value={{ isSearchOpen: open, openSearch }}>
      {children}
      <SearchDialog
        onOpenChange={setOpen}
        open={open}
        returnFocusRef={returnFocusRef}
      />
    </SearchContext.Provider>
  );
}
