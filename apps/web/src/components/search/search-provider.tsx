"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { SearchContext } from "@/components/search/search-context";
import { SearchDialog } from "@/components/search/search-dialog";
import { GO_TO_KEY, TOP_LEVEL_NAV } from "@/components/sidebar/nav-items";

const SEQUENCE_TIMEOUT_MS = 1000;

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName));

export function SearchProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
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

  // "G then O" style chords for the pages that list a shortcut, as on
  // interfaces. Off while the dialog is open or while typing in a field.
  useEffect(() => {
    if (open) {
      return;
    }
    let awaitingKey = false;
    let timer: number | undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) {
        return;
      }
      if (isTyping(event.target)) {
        return;
      }
      const key = event.key.toUpperCase();
      if (!awaitingKey) {
        if (key === GO_TO_KEY) {
          awaitingKey = true;
          timer = window.setTimeout(() => {
            awaitingKey = false;
          }, SEQUENCE_TIMEOUT_MS);
        }
        return;
      }
      awaitingKey = false;
      window.clearTimeout(timer);
      const target = TOP_LEVEL_NAV.find((item) => item.shortcut === key);
      if (target) {
        event.preventDefault();
        router.push(target.href);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, router]);

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
