"use client";

import { createContext, useContext } from "react";

export interface SearchContextValue {
  isSearchOpen: boolean;
  openSearch: () => void;
}

export const SearchContext = createContext<SearchContextValue | null>(null);

export function useSearchContext(): SearchContextValue | null {
  return useContext(SearchContext);
}
