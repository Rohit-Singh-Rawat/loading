import {
  Arc,
  BouncingDots,
  CircularDots,
  Classic,
  Clock,
  Comet,
  Compass,
  Drive,
  type DriveProps,
  type EasingProps,
  Grid,
  type GridProps,
  LinearDots,
  Orbit,
  Pulse,
  Radar,
  Ring,
  Ripple,
  SPINNER_MOTION,
  type SpinnerName,
  type SpinnerProps,
  Swirl,
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
interface SpinnerOption {
  label: string;
  prop: string;
  values: readonly { label: string; value: string }[];
}

type OwnProp<P> = Exclude<keyof P, keyof SpinnerProps> & string;

/** A `SpinnerOption` whose `prop` and values are checked against the spinner's own props. */
type OptionOf<P> = {
  [K in OwnProp<P>]: {
    label: string;
    prop: K;
    values: readonly { label: string; value: NonNullable<P[K]> & string }[];
  };
}[OwnProp<P>];

interface CatalogEntry {
  component: ComponentType<SpinnerProps>;
  description: string;
  name: string;
  options?: readonly SpinnerOption[];
  slug: SpinnerName;
  speed: SpeedRange;
}

/**
 * Checks an entry's options against its component's props. The catalog holds
 * the erased entry, so the spinner's own props are widened here and nowhere
 * else.
 */
function entry<P extends SpinnerProps>(
  definition: Omit<CatalogEntry, "component" | "options"> & {
    component: ComponentType<P>;
    options?: readonly OptionOf<P>[];
  }
): CatalogEntry {
  return definition as CatalogEntry;
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

const EASING_OPTION: OptionOf<EasingProps> = {
  label: "Easing",
  prop: "easing",
  values: [
    { label: "Linear", value: "linear" },
    { label: "Eased", value: "ease-in-out" },
    { label: "Stacked", value: "stacked" },
  ],
};

const DIRECTION_OPTION: OptionOf<GridProps> = {
  label: "Direction",
  prop: "direction",
  values: [
    { label: "Rows", value: "rows" },
    { label: "Columns", value: "columns" },
    { label: "Diagonal", value: "diagonal" },
  ],
};

const SHAPE_OPTION: OptionOf<DriveProps> = {
  label: "Shape",
  prop: "shape",
  values: [
    { label: "Square", value: "square" },
    { label: "Circle", value: "circle" },
  ],
};

const CATALOG: CatalogEntry[] = [
  entry({
    component: Arc,
    description: "A single open stroke rotating in a circle.",
    name: "Arc",
    options: [EASING_OPTION],
    slug: "arc",
    speed: { max: 2000, min: 200 },
  }),
  entry({
    component: Classic,
    description: "Twelve fading bars arranged in a radial pattern.",
    name: "Classic",
    slug: "classic",
    speed: { max: 2400, min: 400 },
  }),
  entry({
    component: Ring,
    description: "An arc rotating in a faint circle.",
    name: "Ring",
    options: [EASING_OPTION],
    slug: "ring",
    speed: { max: 2000, min: 200 },
  }),
  entry({
    component: BouncingDots,
    description: "Three staggered dots bouncing up and down.",
    name: "Bouncing dots",
    slug: "bouncing-dots",
    speed: { max: 1200, min: 150 },
  }),
  entry({
    component: Comet,
    description: "A full ring fading into its tail.",
    name: "Comet",
    options: [EASING_OPTION],
    slug: "comet",
    speed: { max: 2000, min: 200 },
  }),
  entry({
    component: Orbit,
    description: "A fading half-arc rotating around a dot.",
    name: "Orbit",
    options: [EASING_OPTION],
    slug: "orbit",
    speed: { max: 2000, min: 200 },
  }),
  entry({
    component: Grid,
    description: "A pixel grid lit row by row in a sequence.",
    name: "Grid",
    options: [DIRECTION_OPTION],
    slug: "grid",
    speed: { max: 2400, min: 400 },
  }),
  entry({
    component: Ripple,
    description: "A pixel grid pulsing outward from its center.",
    name: "Ripple",
    slug: "ripple",
    speed: { max: 2400, min: 400 },
  }),
  entry({
    component: LinearDots,
    description: "Three dots lighting up in turn from left to right.",
    name: "Linear dots",
    slug: "linear-dots",
    speed: { max: 2400, min: 300 },
  }),
  entry({
    component: Clock,
    description: "A clock hand sweeping around a faint face.",
    name: "Clock",
    options: [EASING_OPTION],
    slug: "clock",
    speed: { max: 3000, min: 300 },
  }),
  entry({
    component: Radar,
    description: "A fading beam sweeping around a dish.",
    name: "Radar",
    options: [EASING_OPTION],
    slug: "radar",
    speed: { max: 3000, min: 300 },
  }),
  entry({
    component: CircularDots,
    description: "Eight dots in a ring, the brightest hopping around.",
    name: "Circular dots",
    slug: "circular-dots",
    speed: { max: 2000, min: 200 },
  }),
  entry({
    component: Pulse,
    description: "A ring rippling outward from a dot.",
    name: "Pulse",
    slug: "pulse",
    speed: { max: 2400, min: 400 },
  }),
  entry({
    component: Compass,
    description: "Four ticks snapping a quarter turn at a time.",
    name: "Compass",
    slug: "compass",
    speed: { max: 1200, min: 150 },
  }),
  entry({
    component: Drive,
    description: "A lit arrowhead driving across a three-by-three grid.",
    name: "Drive",
    options: [SHAPE_OPTION],
    slug: "drive",
    speed: { max: 2400, min: 300 },
  }),
  entry({
    component: Swirl,
    description: "A bright cell chasing its trail around a square.",
    name: "Swirl",
    slug: "swirl",
    speed: { max: 2400, min: 400 },
  }),
];

export const SPINNER_ITEMS: SpinnerItem[] = CATALOG.map((item) => ({
  ...item,
  speed: { default: SPINNER_MOTION[item.slug].duration, ...item.speed },
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
