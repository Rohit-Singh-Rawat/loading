"use client";

import { SPINNER_MOTION, type SpinnerProps } from "loading-dev";
import { useState } from "react";
import {
  DEFAULT_PREVIEW_SIZE,
  type SpinnerItem,
  type SpinnerOptions,
} from "@/components/spinners";

const FULLY_OPAQUE = 100;

export interface SpinnerCustomizationState {
  color: string | null;
  opacity: number;
  options: SpinnerOptions;
  paused: boolean;
  reset: () => void;
  setColor: (color: string) => void;
  setOpacity: (percent: number) => void;
  setOption: <K extends keyof SpinnerOptions>(
    prop: K,
    value: NonNullable<SpinnerOptions[K]>
  ) => void;
  setSize: (size: number) => void;
  setSpeedMs: (speedMs: number) => void;
  size: number;
  speedMs: number;
  spinnerProps: SpinnerProps & SpinnerOptions;
  togglePaused: () => void;
}

export function useCustomizationState(
  item: SpinnerItem
): SpinnerCustomizationState {
  const defaultDuration = SPINNER_MOTION[item.slug];
  const [paused, setPaused] = useState(false);
  const [size, setSize] = useState(DEFAULT_PREVIEW_SIZE);
  const [color, setColor] = useState<string | null>(null);
  const [speedMs, setSpeedMs] = useState<number>(defaultDuration);
  const [opacity, setOpacity] = useState(FULLY_OPAQUE);
  const [options, setOptions] = useState<SpinnerOptions>({});

  const spinnerProps: SpinnerProps & SpinnerOptions = {
    ...options,
    color: color ?? undefined,
    duration: speedMs,
    playState: paused ? "paused" : "running",
    size,
  };

  return {
    color,
    opacity,
    options,
    paused,
    reset: () => {
      setSize(DEFAULT_PREVIEW_SIZE);
      setColor(null);
      setSpeedMs(defaultDuration);
      setOpacity(FULLY_OPAQUE);
      setOptions({});
    },
    setColor,
    setOpacity,
    setOption: (prop, value) =>
      setOptions((previous) => ({ ...previous, [prop]: value })),
    setSize,
    setSpeedMs,
    size,
    speedMs,
    spinnerProps,
    togglePaused: () => setPaused((value) => !value),
  };
}
