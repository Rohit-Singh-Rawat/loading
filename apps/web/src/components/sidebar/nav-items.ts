import { AVAILABLE_SPINNERS } from "@/components/spinners";

const TOP_LEVEL_NAV = [{ href: "/", label: "Overview" }];

export const NAV_ITEMS: { href: string; label: string }[] = [
  ...TOP_LEVEL_NAV,
  ...AVAILABLE_SPINNERS.map((item) => ({
    href: `/spinners/${item.slug}`,
    label: item.name,
  })),
];
