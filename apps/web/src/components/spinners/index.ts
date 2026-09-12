import {
  Arc,
  BouncingDots,
  Classic,
  Comet,
  type Easing,
  Grid,
  type GridDirection,
  Orbit,
  Ring,
  Ripple,
  SPINNER_MOTION,
  type SpinnerName,
  type SpinnerProps,
} from "loading-dev";
import type { ComponentType } from "react";

interface SpeedRange {
  max: number;
  min: number;
}

/**
 * A choice a spinner offers beyond the shared props, shown as a control beside
 * its preview. Array position is the control's order, and the first value must
 * be the library's default so the preview starts where the snippet does.
 */
export interface SpinnerOption {
  label: string;
  prop: string;
  values: readonly { label: string; value: string }[];
}

interface CatalogEntry {
  component: ComponentType<SpinnerProps>;
  description: string;
  name: string;
  options?: readonly SpinnerOption[];
  slug: SpinnerName;
  speed: SpeedRange;
}

export interface SpinnerItem extends CatalogEntry {
  speed: SpeedRange & { default: number };
}

export interface SpinnerParams {
  slug: string;
}

export const SIZES = [
  { label: "Small", value: 24 },
  { label: "Medium", value: 48 },
  { label: "Large", value: 96 },
];

export const DEFAULT_SIZE_INDEX = 1;

const EASINGS: readonly { label: string; value: Easing }[] = [
  { label: "Linear", value: "linear" },
  { label: "Eased", value: "ease-in-out" },
  { label: "Stacked", value: "stacked" },
];

const EASING_OPTION: SpinnerOption = {
  label: "Easing",
  prop: "easing",
  values: EASINGS,
};

const DIRECTIONS: readonly { label: string; value: GridDirection }[] = [
  { label: "Rows", value: "rows" },
  { label: "Columns", value: "columns" },
  { label: "Diagonal", value: "diagonal" },
];

const CATALOG: CatalogEntry[] = [
  {
    component: Arc,
    description: "A single open stroke rotating in a circle.",
    name: "Arc",
    options: [EASING_OPTION],
    slug: "arc",
    speed: { max: 2000, min: 200 },
  },
  {
    component: Classic,
    description: "Twelve fading bars arranged in a radial pattern.",
    name: "Classic",
    slug: "classic",
    speed: { max: 2400, min: 400 },
  },
  {
    component: Ring,
    description: "An arc rotating in a faint circle.",
    name: "Ring",
    options: [EASING_OPTION],
    slug: "ring",
    speed: { max: 2000, min: 200 },
  },
  {
    component: BouncingDots,
    description: "Three staggered dots bouncing up and down.",
    name: "Bouncing dots",
    slug: "bouncing-dots",
    speed: { max: 1200, min: 150 },
  },
  {
    component: Comet,
    description: "A full ring fading into its tail.",
    name: "Comet",
    options: [EASING_OPTION],
    slug: "comet",
    speed: { max: 2000, min: 200 },
  },
  {
    component: Orbit,
    description: "A fading half-arc rotating around a dot.",
    name: "Orbit",
    options: [EASING_OPTION],
    slug: "orbit",
    speed: { max: 2000, min: 200 },
  },
  {
    component: Grid,
    description: "A pixel grid lit row by row in a sequence.",
    name: "Grid",
    options: [{ label: "Direction", prop: "direction", values: DIRECTIONS }],
    slug: "grid",
    speed: { max: 2400, min: 400 },
  },
  {
    component: Ripple,
    description: "A pixel grid pulsing outward from its center.",
    name: "Ripple",
    slug: "ripple",
    speed: { max: 2400, min: 400 },
  },
];

export const SPINNER_ITEMS: SpinnerItem[] = CATALOG.map((entry) => ({
  ...entry,
  speed: { default: SPINNER_MOTION[entry.slug].duration, ...entry.speed },
}));

export function spinnerParams(): SpinnerParams[] {
  return SPINNER_ITEMS.map(({ slug }) => ({ slug }));
}

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
