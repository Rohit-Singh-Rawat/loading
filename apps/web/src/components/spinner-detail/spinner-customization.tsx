"use client";

import { DURATION_VAR, PLAY_STATE_VAR } from "loading-dev";
import {
  type CSSProperties,
  createContext,
  type ReactNode,
  useContext,
  useState,
} from "react";
import { getSpinner, type SpinnerItem } from "@/components/spinners";

/** Percent, the unit the opacity control works in. */
const FULLY_OPAQUE = 100;

export interface SpinnerCustomizationState {
  /** Hex string, or null for "Auto" — inherit the surrounding text color. */
  color: string | null;
  /** 0–100, the unit the control uses. */
  opacity: number;
  paused: boolean;
  /** Style for the element wrapping the spinner: color, opacity, motion vars. */
  previewStyle: CSSProperties;
  /** Restores the customization controls. Does not affect playback. */
  reset: () => void;
  setColor: (color: string) => void;
  setOpacity: (percent: number) => void;
  setSizeIndex: (index: number) => void;
  setSpeedMs: (speedMs: number) => void;
  /** Resolved pixel size, for the rendered spinner and its code snippet. */
  size: number;
  sizeIndex: number;
  speedMs: number;
  togglePaused: () => void;
}

interface SpinnerCustomizationValue {
  item: SpinnerItem;
  state: SpinnerCustomizationState;
}

const SpinnerCustomizationContext =
  createContext<SpinnerCustomizationValue | null>(null);

function defaultSizeIndex(item: SpinnerItem): number {
  const index = item.customization.sizes.findIndex((size) => size.default);
  return index === -1 ? 0 : index;
}

function useCustomizationState(item: SpinnerItem): SpinnerCustomizationState {
  const { sizes, speed } = item.customization;
  const initialSizeIndex = defaultSizeIndex(item);

  const [paused, setPaused] = useState(false);
  const [sizeIndex, setSizeIndex] = useState(initialSizeIndex);
  const [color, setColor] = useState<string | null>(null);
  const [speedMs, setSpeedMs] = useState(speed.default);
  const [opacity, setOpacity] = useState(FULLY_OPAQUE);

  const previewStyle = {
    [DURATION_VAR]: `${speedMs}ms`,
    [PLAY_STATE_VAR]: paused ? "paused" : "running",
    opacity: opacity / FULLY_OPAQUE,
    ...(color ? { color } : {}),
  } as CSSProperties;

  return {
    color,
    opacity,
    paused,
    previewStyle,
    reset: () => {
      setSizeIndex(initialSizeIndex);
      setColor(null);
      setSpeedMs(speed.default);
      setOpacity(FULLY_OPAQUE);
    },
    setColor,
    setOpacity,
    setSizeIndex,
    setSpeedMs,
    size: sizes[sizeIndex]?.value ?? sizes[initialSizeIndex]?.value ?? 0,
    sizeIndex,
    speedMs,
    togglePaused: () => setPaused((value) => !value),
  };
}

/**
 * Owns everything the customization controls change, and every value derived
 * from it — the pixel size the spinner renders at, the style carrying the
 * motion variables, and what "reset" means.
 *
 * It is a provider rather than a plain hook because the preview and the code
 * snippet are separate subtrees reading the same state: whatever the snippet
 * prints is what is on screen.
 *
 * Takes a slug rather than an item because the registry holds component
 * functions, which cannot cross the server/client boundary as props.
 */
export function SpinnerCustomizationProvider({
  children,
  slug,
}: {
  children: ReactNode;
  slug: string;
}) {
  const item = getSpinner(slug);
  if (!item) {
    throw new Error(`No spinner registered for slug "${slug}"`);
  }

  return <Provider item={item}>{children}</Provider>;
}

function Provider({
  children,
  item,
}: {
  children: ReactNode;
  item: SpinnerItem;
}) {
  const state = useCustomizationState(item);

  return (
    <SpinnerCustomizationContext value={{ item, state }}>
      {children}
    </SpinnerCustomizationContext>
  );
}

export function useSpinnerCustomization(): SpinnerCustomizationValue {
  const value = useContext(SpinnerCustomizationContext);
  if (!value) {
    throw new Error(
      "useSpinnerCustomization must be used inside a SpinnerCustomizationProvider"
    );
  }
  return value;
}
