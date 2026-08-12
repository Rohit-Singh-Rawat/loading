import {
  Arc,
  BouncingDots,
  Classic,
  Comet,
  Grid,
  Orbit,
  Ring,
  Ripple,
  type SpinnerProps,
} from "loading-dev";
import type { ComponentType } from "react";

export interface SpinnerCustomization {
  color?: boolean;
  opacity?: boolean;
  sizes?: { label: string; value: number }[];
  speed?: { default: number; max: number; min: number };
}

export interface SpinnerItem {
  component?: ComponentType<SpinnerProps>;
  customization?: SpinnerCustomization;
  description?: string;
  hasDocs?: boolean;
  name: string;
  slug: string;
}

const DEFAULT_SIZES = [
  { label: "Small", value: 24 },
  { label: "Medium", value: 48 },
  { label: "Large", value: 96 },
];

export const SPINNER_ITEMS: SpinnerItem[] = [
  { name: "Accordion loader", slug: "accordion-loader" },
  {
    component: Arc,
    customization: {
      color: true,
      opacity: true,
      sizes: DEFAULT_SIZES,
      speed: { default: 800, max: 2000, min: 200 },
    },
    description: "A single open stroke sweeping around a circular track.",
    hasDocs: true,
    name: "Arc",
    slug: "arc",
  },
  { name: "Analyzing image", slug: "analyzing-image" },
  { name: "Bars", slug: "bars" },
  { name: "Bobbing dots", slug: "bobbing-dots" },
  {
    component: BouncingDots,
    customization: {
      color: true,
      opacity: true,
      sizes: DEFAULT_SIZES,
      speed: { default: 500, max: 1200, min: 150 },
    },
    description: "Three dots bouncing in a staggered rhythm.",
    hasDocs: true,
    name: "Bouncing dots",
    slug: "bouncing-dots",
  },
  {
    component: Classic,
    customization: {
      color: true,
      opacity: true,
      sizes: DEFAULT_SIZES,
      speed: { default: 1200, max: 2400, min: 400 },
    },
    description: "Twelve fading bars arranged in the classic radial spinner.",
    hasDocs: true,
    name: "Classic",
    slug: "classic",
  },
  {
    component: Comet,
    customization: {
      color: true,
      opacity: true,
      sizes: DEFAULT_SIZES,
      speed: { default: 700, max: 2000, min: 200 },
    },
    description: "A full ring fading into a bright leading head.",
    hasDocs: true,
    name: "Comet",
    slug: "comet",
  },
  {
    component: Grid,
    customization: {
      color: true,
      opacity: true,
      sizes: DEFAULT_SIZES,
      speed: { default: 1200, max: 2400, min: 400 },
    },
    description: "A four-by-four pixel grid lit row by row.",
    hasDocs: true,
    name: "Grid",
    slug: "grid",
  },
  {
    component: Ring,
    customization: {
      color: true,
      opacity: true,
      sizes: DEFAULT_SIZES,
      speed: { default: 800, max: 2000, min: 200 },
    },
    description: "A rotating arc riding a faint circular track.",
    hasDocs: true,
    name: "Loader",
    slug: "loader",
  },
  {
    component: Orbit,
    customization: {
      color: true,
      opacity: true,
      sizes: DEFAULT_SIZES,
      speed: { default: 750, max: 2000, min: 200 },
    },
    description: "A fading half-arc circling a fixed center dot.",
    hasDocs: true,
    name: "Orbit",
    slug: "orbit",
  },
  {
    component: Ripple,
    customization: {
      color: true,
      opacity: true,
      sizes: DEFAULT_SIZES,
      speed: { default: 1200, max: 2400, min: 400 },
    },
    description: "A pixel grid pulsing outward from its center.",
    hasDocs: true,
    name: "Ripple",
    slug: "ripple",
  },
];

export const AVAILABLE_SPINNERS: SpinnerItem[] = SPINNER_ITEMS.filter(
  (item) => item.component
);

export function getSpinner(slug: string): SpinnerItem | undefined {
  return SPINNER_ITEMS.find((item) => item.slug === slug);
}

export function getAdjacentSpinners(slug: string): {
  next?: SpinnerItem;
  previous?: SpinnerItem;
} {
  const available = AVAILABLE_SPINNERS;
  const index = available.findIndex((item) => item.slug === slug);
  if (index === -1) {
    return {};
  }
  return {
    next: available[index + 1],
    previous: available[index - 1],
  };
}
