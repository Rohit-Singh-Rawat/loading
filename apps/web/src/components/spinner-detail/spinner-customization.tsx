"use client";

import { SPINNER_MOTION, type SpinnerProps } from "loading-dev";
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
  options: Record<string, string>;
  paused: boolean;
  reset: () => void;
  setColor: (color: string) => void;
  setOpacity: (percent: number) => void;
  setOption: (prop: string, value: string) => void;
  setSizeIndex: (index: number) => void;
  setSpeedMs: (speedMs: number) => void;
  sizeIndex: number;
  speedMs: number;
  spinnerProps: SpinnerProps & Record<string, unknown>;
  togglePaused: () => void;
}

function defaultOptions(item: SpinnerItem): Record<string, string> {
  return Object.fromEntries(
    (item.options ?? []).map((option) => {
      const [first] = option.values;
      return [option.prop, first.value];
    })
  );
}

export function useCustomizationState(
  item: SpinnerItem
): SpinnerCustomizationState {
  const defaultDuration = SPINNER_MOTION[item.slug].duration;
  const [paused, setPaused] = useState(false);
  const [sizeIndex, setSizeIndex] = useState(DEFAULT_SIZE_INDEX);
  const [color, setColor] = useState<string | null>(null);
  const [speedMs, setSpeedMs] = useState<number>(defaultDuration);
  const [opacity, setOpacity] = useState(FULLY_OPAQUE);
  const [options, setOptions] = useState(() => defaultOptions(item));

  const spinnerProps: SpinnerProps & Record<string, unknown> = {
    ...options,
    color: color ?? undefined,
    duration: speedMs,
    playState: paused ? "paused" : "running",
    size: SIZES[sizeIndex].value,
  };

  return {
    color,
    opacity,
    options,
    paused,
    reset: () => {
      setSizeIndex(DEFAULT_SIZE_INDEX);
      setColor(null);
      setSpeedMs(defaultDuration);
      setOpacity(FULLY_OPAQUE);
      setOptions(defaultOptions(item));
    },
    setColor,
    setOpacity,
    setOption: (prop, value) =>
      setOptions((previous) => ({ ...previous, [prop]: value })),
    setSizeIndex,
    setSpeedMs,
    sizeIndex,
    speedMs,
    spinnerProps,
    togglePaused: () => setPaused((value) => !value),
  };
}
