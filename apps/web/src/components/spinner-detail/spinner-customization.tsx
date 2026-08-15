"use client";

import type { SpinnerProps } from "loading-dev";
import { createContext, type ReactNode, useContext, useState } from "react";
import {
  DEFAULT_SIZE_INDEX,
  getSpinner,
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

interface SpinnerCustomizationValue {
  item: SpinnerItem;
  state: SpinnerCustomizationState;
}

const SpinnerCustomizationContext =
  createContext<SpinnerCustomizationValue | null>(null);

function useCustomizationState(item: SpinnerItem): SpinnerCustomizationState {
  const { sizes, speed } = item.customization;

  const [paused, setPaused] = useState(false);
  const [sizeIndex, setSizeIndex] = useState(DEFAULT_SIZE_INDEX);
  const [color, setColor] = useState<string | null>(null);
  const [speedMs, setSpeedMs] = useState(speed.default);
  const [opacity, setOpacity] = useState(FULLY_OPAQUE);

  const spinnerProps: SpinnerProps = {
    color: color ?? undefined,
    duration: speedMs,
    playState: paused ? "paused" : "running",
    size: sizes[sizeIndex].value,
  };

  return {
    color,
    opacity,
    paused,
    reset: () => {
      setSizeIndex(DEFAULT_SIZE_INDEX);
      setColor(null);
      setSpeedMs(speed.default);
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
