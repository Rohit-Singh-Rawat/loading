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

interface SpeedRange {
  max: number;
  min: number;
}

interface CatalogEntry {
  component: ComponentType<SpinnerProps>;
  description: string;
  name: string;
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

const CATALOG: CatalogEntry[] = [
  {
    component: Arc,
    description: "A single open stroke rotating in a circle.",
    name: "Arc",
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
    slug: "comet",
    speed: { max: 2000, min: 200 },
  },
  {
    component: Orbit,
    description: "A fading half-arc rotating around a dot.",
    name: "Orbit",
    slug: "orbit",
    speed: { max: 2000, min: 200 },
  },
  {
    component: Grid,
    description: "A pixel grid lit row by row in a sequence.",
    name: "Grid",
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
