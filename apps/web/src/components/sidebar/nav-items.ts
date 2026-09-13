import { SPINNER_ITEMS } from "@/components/spinners";

export const GO_TO_KEY = "G";

export interface NavItem {
  href: string;
  keywords?: string[];
  label: string;
  shortcut?: string;
}

export const TOP_LEVEL_NAV: NavItem[] = [
  { href: "/", label: "Overview", shortcut: "O" },
];

export const SPINNER_NAV: NavItem[] = SPINNER_ITEMS.map((item) => ({
  href: item.href,
  keywords: [item.slug],
  label: item.name,
}));

export const NAV_ITEMS: NavItem[] = [...TOP_LEVEL_NAV, ...SPINNER_NAV];
