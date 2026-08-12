import {
  Arc,
  BouncingDots,
  Classic,
  Comet,
  Grid,
  Orbit,
  Ring,
  Ripple,
  SPINNER_MOTION,
  type SpinnerName,
  type SpinnerProps,
} from "loading-dev";
import type { ComponentType } from "react";

export interface SpinnerSize {
  /** Selected when the page loads. Exactly one size sets this. */
  default?: boolean;
  label: string;
  value: number;
}

export interface SpinnerCustomization {
  color: boolean;
  opacity: boolean;
  sizes: SpinnerSize[];
  speed: { default: number; max: number; min: number };
}

export interface SpinnerItem {
  component: ComponentType<SpinnerProps>;
  customization: SpinnerCustomization;
  description: string;
  name: string;
  /** Also the filename of the spinner's MDX document. */
  slug: string;
}

const DEFAULT_SIZES: SpinnerSize[] = [
  { label: "Small", value: 24 },
  { default: true, label: "Medium", value: 48 },
  { label: "Large", value: 96 },
];

/**
 * Every spinner offers the same controls; only the speed range differs. The
 * speed's default is read from the library rather than restated here, so the
 * slider resets to the duration the CSS actually uses.
 */
function customizationFor(
  name: SpinnerName,
  speed: { max: number; min: number }
): SpinnerCustomization {
  return {
    color: true,
    opacity: true,
    sizes: DEFAULT_SIZES,
    speed: { default: SPINNER_MOTION[name].duration, ...speed },
  };
}

/**
 * The catalog. This array's order is the order everywhere: the homepage grid,
 * the sidebar, and previous/next on a spinner page.
 */
export const SPINNER_ITEMS: SpinnerItem[] = [
  {
    component: Arc,
    customization: customizationFor("arc", { max: 2000, min: 200 }),
    description: "A single open stroke sweeping around a circular track.",
    name: "Arc",
    slug: "arc",
  },
  {
    component: Classic,
    customization: customizationFor("classic", { max: 2400, min: 400 }),
    description: "Twelve fading bars arranged in the classic radial spinner.",
    name: "Classic",
    slug: "classic",
  },
  {
    component: Ring,
    customization: customizationFor("ring", { max: 2000, min: 200 }),
    description: "A rotating arc riding a faint circular track.",
    name: "Ring",
    slug: "ring",
  },
  {
    component: BouncingDots,
    customization: customizationFor("bouncing-dots", { max: 1200, min: 150 }),
    description: "Three dots bouncing in a staggered rhythm.",
    name: "Bouncing dots",
    slug: "bouncing-dots",
  },
  {
    component: Comet,
    customization: customizationFor("comet", { max: 2000, min: 200 }),
    description: "A full ring fading into a bright leading head.",
    name: "Comet",
    slug: "comet",
  },
  {
    component: Orbit,
    customization: customizationFor("orbit", { max: 2000, min: 200 }),
    description: "A fading half-arc circling a fixed center dot.",
    name: "Orbit",
    slug: "orbit",
  },
  {
    component: Grid,
    customization: customizationFor("grid", { max: 2400, min: 400 }),
    description: "A four-by-four pixel grid lit row by row.",
    name: "Grid",
    slug: "grid",
  },
  {
    component: Ripple,
    customization: customizationFor("ripple", { max: 2400, min: 400 }),
    description: "A pixel grid pulsing outward from its center.",
    name: "Ripple",
    slug: "ripple",
  },
];

export function getSpinner(slug: string): SpinnerItem | undefined {
  return SPINNER_ITEMS.find((item) => item.slug === slug);
}

export function getAdjacentSpinners(slug: string): {
  next?: SpinnerItem;
  previous?: SpinnerItem;
} {
  const index = SPINNER_ITEMS.findIndex((item) => item.slug === slug);
  if (index === -1) {
    return {};
  }
  return {
    next: SPINNER_ITEMS[index + 1],
    previous: SPINNER_ITEMS[index - 1],
  };
}
