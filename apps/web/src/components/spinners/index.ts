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
  label: string;
  value: number;
}

export interface SpinnerCustomization {
  sizes: SpinnerSize[];
  speed: { default: number; max: number; min: number };
}

interface CatalogEntry {
  component: ComponentType<SpinnerProps>;
  componentName: string;
  description: string;
  name: string;
  slug: SpinnerName;
  speed: { max: number; min: number };
}

export interface SpinnerItem extends Omit<CatalogEntry, "speed"> {
  customization: SpinnerCustomization;
}

const SIZES: SpinnerSize[] = [
  { label: "Small", value: 24 },
  { label: "Medium", value: 48 },
  { label: "Large", value: 96 },
];

export const DEFAULT_SIZE_INDEX = 1;

const CATALOG: CatalogEntry[] = [
  {
    component: Arc,
    componentName: "Arc",
    description: "A single open stroke sweeping around a circular track.",
    name: "Arc",
    slug: "arc",
    speed: { max: 2000, min: 200 },
  },
  {
    component: Classic,
    componentName: "Classic",
    description: "Twelve fading bars arranged in the classic radial spinner.",
    name: "Classic",
    slug: "classic",
    speed: { max: 2400, min: 400 },
  },
  {
    component: Ring,
    componentName: "Ring",
    description: "A rotating arc riding a faint circular track.",
    name: "Ring",
    slug: "ring",
    speed: { max: 2000, min: 200 },
  },
  {
    component: BouncingDots,
    componentName: "BouncingDots",
    description: "Three dots bouncing in a staggered rhythm.",
    name: "Bouncing dots",
    slug: "bouncing-dots",
    speed: { max: 1200, min: 150 },
  },
  {
    component: Comet,
    componentName: "Comet",
    description: "A full ring fading into a bright leading head.",
    name: "Comet",
    slug: "comet",
    speed: { max: 2000, min: 200 },
  },
  {
    component: Orbit,
    componentName: "Orbit",
    description: "A fading half-arc circling a fixed center dot.",
    name: "Orbit",
    slug: "orbit",
    speed: { max: 2000, min: 200 },
  },
  {
    component: Grid,
    componentName: "Grid",
    description: "A four-by-four pixel grid lit row by row.",
    name: "Grid",
    slug: "grid",
    speed: { max: 2400, min: 400 },
  },
  {
    component: Ripple,
    componentName: "Ripple",
    description: "A pixel grid pulsing outward from its center.",
    name: "Ripple",
    slug: "ripple",
    speed: { max: 2400, min: 400 },
  },
];

export const SPINNER_ITEMS: SpinnerItem[] = CATALOG.map(
  ({ speed, ...entry }) => ({
    ...entry,
    customization: {
      sizes: SIZES,
      speed: { default: SPINNER_MOTION[entry.slug].duration, ...speed },
    },
  })
);

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
