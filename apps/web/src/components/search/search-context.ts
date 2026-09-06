"use client";

import { createContext, useContext } from "react";

export interface SearchContextValue {
  isSearchOpen: boolean;
  openSearch: () => void;
}

export const SearchContext = createContext<SearchContextValue | null>(null);

export function useSearchContext(): SearchContextValue {
  const value = useContext(SearchContext);
  if (!value) {
    throw new Error("useSearchContext must be used inside a SearchProvider");
  }
  return value;
}
