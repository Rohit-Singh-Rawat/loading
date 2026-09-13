import { SPINNER_ITEMS } from "@/components/spinners";

const TOP_LEVEL_NAV = [{ href: "/", label: "Overview" }];

export const NAV_ITEMS: { href: string; keywords?: string[]; label: string }[] =
  [
    ...TOP_LEVEL_NAV,
    ...SPINNER_ITEMS.map((item) => ({
      href: item.href,
      keywords: [item.slug],
      label: item.name,
    })),
  ];
