import { DURATION_VAR, PLAY_STATE_VAR } from "loading-dev";
import { type CSSProperties, useState } from "react";
import type { SpinnerItem } from "@/components/spinners";

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

function defaultSizeIndex(item: SpinnerItem): number {
  const index = item.customization.sizes.findIndex((size) => size.default);
  return index === -1 ? 0 : index;
}

/**
 * Owns everything the customization controls change, and every value derived
 * from it — the pixel size the spinner renders at, the style carrying the
 * motion variables, and what "reset" means.
 *
 * The controls and the preview read the same state, so the code snippet can
 * too: whatever it prints is what is on screen.
 */
export function useSpinnerCustomization(
  item: SpinnerItem
): SpinnerCustomizationState {
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
