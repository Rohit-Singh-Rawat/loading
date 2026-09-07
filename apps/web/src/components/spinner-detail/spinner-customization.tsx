"use client";

import type { SpinnerProps } from "loading-dev";
import { useState } from "react";
import {
  DEFAULT_SIZE_INDEX,
  SIZES,
  type SpinnerItem,
} from "@/components/spinners";

const FULLY_OPAQUE = 100;

export interface SpinnerCustomizationState {
  color: string | null;
  opacity: number;
  paused: boolean;
  reset: () => void;
  setColor: (color: string) => void;
  setOpacity: (percent: number) => void;
  setSizeIndex: (index: number) => void;
  setSpeedMs: (speedMs: number) => void;
  sizeIndex: number;
  speedMs: number;
  spinnerProps: SpinnerProps;
  togglePaused: () => void;
}

export function useCustomizationState(
  item: SpinnerItem
): SpinnerCustomizationState {
  const [paused, setPaused] = useState(false);
  const [sizeIndex, setSizeIndex] = useState(DEFAULT_SIZE_INDEX);
  const [color, setColor] = useState<string | null>(null);
  const [speedMs, setSpeedMs] = useState(item.speed.default);
  const [opacity, setOpacity] = useState(FULLY_OPAQUE);

  const spinnerProps: SpinnerProps = {
    color: color ?? undefined,
    duration: speedMs,
    playState: paused ? "paused" : "running",
    size: SIZES[sizeIndex].value,
  };

  return {
    color,
    opacity,
    paused,
    reset: () => {
      setSizeIndex(DEFAULT_SIZE_INDEX);
      setColor(null);
      setSpeedMs(item.speed.default);
      setOpacity(FULLY_OPAQUE);
    },
    setColor,
    setOpacity,
    setSizeIndex,
    setSpeedMs,
    sizeIndex,
    speedMs,
    spinnerProps,
    togglePaused: () => setPaused((value) => !value),
  };
}
