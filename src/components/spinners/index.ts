import type { ComponentType } from "react";
import { Arc } from "./arc";
import { BouncingDots } from "./bouncing-dots";
import { Classic } from "./classic";
import { Ring } from "./ring";
import type { SpinnerProps } from "./types";

export interface SpinnerItem {
  component?: ComponentType<SpinnerProps>;
  name: string;
  slug: string;
}

// Hand-maintained, alphabetical. Entries without a component render as
// "coming soon" on their detail page until the spinner is built.
export const SPINNER_ITEMS: SpinnerItem[] = [
  { name: "Accordion loader", slug: "accordion-loader" },
  { component: Arc, name: "Arc", slug: "arc" },
  { name: "Analyzing image", slug: "analyzing-image" },
  { name: "Bars", slug: "bars" },
  { name: "Bobbing dots", slug: "bobbing-dots" },
  { component: BouncingDots, name: "Bouncing dots", slug: "bouncing-dots" },
  { component: Classic, name: "Classic", slug: "classic" },
  { component: Ring, name: "Loader", slug: "loader" },
];

export function getSpinner(slug: string): SpinnerItem | undefined {
  return SPINNER_ITEMS.find((item) => item.slug === slug);
}
