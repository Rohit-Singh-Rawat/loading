import type {
  EasingProps,
  SPINNERS,
  SpinnerName,
  SpinnerProps,
} from "loading-dev";
import type { ComponentProps } from "react";

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
  href: string;
  name: string;
  options?: readonly SpinnerOption[];
  slug: SpinnerName;
  speed: SpeedRange;
}

function entry<S extends SpinnerName>(
  definition: Omit<SpinnerItem, "href" | "slug" | "options"> & {
    slug: S;
    options?: readonly OptionOf<
      ComponentProps<(typeof SPINNERS)[NoInfer<S>]>
    >[];
  }
): SpinnerItem {
  return { ...definition, href: `/spinners/${definition.slug}` };
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
    description: "Two lit ticks stepping around a ring of eight.",
    name: "Classic v2",
    slug: "classic-v2",
    speed: { max: 2000, min: 400 },
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
  // entry({
  //   description: "A fading beam sweeping around a dish.",
  //   name: "Radar",
  //   options: [EASING_OPTION],
  //   slug: "radar",
  //   speed: { max: 3000, min: 300 },
  // }),
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
