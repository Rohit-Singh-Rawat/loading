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

const FULLY_OPAQUE = 100;

export interface SpinnerCustomizationState {
  color: string | null;
  opacity: number;
  paused: boolean;
  previewStyle: CSSProperties;
  reset: () => void;
  setColor: (color: string) => void;
  setOpacity: (percent: number) => void;
  setSizeIndex: (index: number) => void;
  setSpeedMs: (speedMs: number) => void;
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
    size: sizes[sizeIndex].value,
    sizeIndex,
    speedMs,
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
