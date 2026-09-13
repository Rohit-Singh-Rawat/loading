import type {
  DriveProps,
  EasingProps,
  GridProps,
  SpinnerName,
  SpinnerProps,
} from "loading-dev";
import type { ComponentProps } from "react";
import type { SPINNER_COMPONENTS } from "./components";

interface SpeedRange {
  max: number;
  min: number;
}

type OptionValues<Value extends string> = readonly [
  { label: string; value: Value },
  ...{ label: string; value: Value }[],
];

interface SpinnerOption {
  label: string;
  prop: string;
  values: OptionValues<string>;
}

type OwnProp<P> = Exclude<keyof P, keyof SpinnerProps> & string;

type OptionOf<P> = {
  [K in OwnProp<P>]: {
    label: string;
    prop: K;
    values: OptionValues<NonNullable<P[K]> & string>;
  };
}[OwnProp<P>];

export interface SpinnerItem {
  description: string;
  name: string;
  options?: readonly SpinnerOption[];
  slug: SpinnerName;
  speed: SpeedRange;
}

function entry<S extends SpinnerName>(
  definition: Omit<SpinnerItem, "slug" | "options"> & {
    slug: S;
    options?: readonly OptionOf<
      ComponentProps<(typeof SPINNER_COMPONENTS)[NoInfer<S>]>
    >[];
  }
): SpinnerItem {
  return definition;
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

const CATALOG: SpinnerItem[] = [
  entry({
    description: "A single open stroke rotating in a circle.",
    name: "Arc",
    options: [EASING_OPTION],
    slug: "arc",
    speed: { max: 2000, min: 200 },
  }),
  entry({
    description: "Twelve fading bars arranged in a radial pattern.",
    name: "Classic",
    slug: "classic",
    speed: { max: 2400, min: 400 },
  }),
  entry({
    description: "An arc rotating in a faint circle.",
    name: "Ring",
    options: [EASING_OPTION],
    slug: "ring",
    speed: { max: 2000, min: 200 },
  }),
  entry({
    description: "Three staggered dots bouncing up and down.",
    name: "Bouncing dots",
    slug: "bouncing-dots",
    speed: { max: 1200, min: 150 },
  }),
  entry({
    description: "A full ring fading into its tail.",
    name: "Comet",
    options: [EASING_OPTION],
    slug: "comet",
    speed: { max: 2000, min: 200 },
  }),
  entry({
    description: "A fading half-arc rotating around a dot.",
    name: "Orbit",
    options: [EASING_OPTION],
    slug: "orbit",
    speed: { max: 2000, min: 200 },
  }),
  entry({
    description: "A pixel grid lit row by row in a sequence.",
    name: "Grid",
    options: [DIRECTION_OPTION],
    slug: "grid",
    speed: { max: 2400, min: 400 },
  }),
  entry({
    description: "A pixel grid pulsing outward from its center.",
    name: "Ripple",
    slug: "ripple",
    speed: { max: 2400, min: 400 },
  }),
  entry({
    description: "Three dots lighting up in turn from left to right.",
    name: "Linear dots",
    slug: "linear-dots",
    speed: { max: 2400, min: 300 },
  }),
  entry({
    description: "A clock hand sweeping around a faint face.",
    name: "Clock",
    options: [EASING_OPTION],
    slug: "clock",
    speed: { max: 3000, min: 300 },
  }),
  entry({
    description: "A fading beam sweeping around a dish.",
    name: "Radar",
    options: [EASING_OPTION],
    slug: "radar",
    speed: { max: 3000, min: 300 },
  }),
  entry({
    description: "Eight dots in a ring, the brightest hopping around.",
    name: "Circular dots",
    slug: "circular-dots",
    speed: { max: 2000, min: 200 },
  }),
  entry({
    description: "A ring rippling outward from a dot.",
    name: "Pulse",
    slug: "pulse",
    speed: { max: 2400, min: 400 },
  }),
  entry({
    description: "Four ticks snapping a quarter turn at a time.",
    name: "Compass",
    slug: "compass",
    speed: { max: 1200, min: 150 },
  }),
  entry({
    description: "A lit arrowhead driving across a three-by-three grid.",
    name: "Drive",
    options: [SHAPE_OPTION],
    slug: "drive",
    speed: { max: 2400, min: 300 },
  }),
  entry({
    description: "A bright cell chasing its trail around a square.",
    name: "Swirl",
    slug: "swirl",
    speed: { max: 2400, min: 400 },
  }),
];

export { CATALOG as SPINNER_ITEMS };

export function spinnerParams(): SpinnerParams[] {
  return CATALOG.map(({ slug }) => ({ slug }));
}

export function getSpinner(slug: string): SpinnerItem | undefined {
  return CATALOG.find((item) => item.slug === slug);
}

export function getAdjacentSpinners(slug: string): {
  next?: SpinnerItem;
  previous?: SpinnerItem;
} {
  const index = CATALOG.findIndex((item) => item.slug === slug);
  if (index === -1) {
    return {};
  }
  return {
    next: CATALOG[index + 1],
    previous: CATALOG[index - 1],
  };
}
