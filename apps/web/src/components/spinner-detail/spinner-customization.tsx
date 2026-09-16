"use client";

import { SPINNER_MOTION, type SpinnerProps } from "loading-dev";
import { createContext, type ReactNode, useContext, useState } from "react";
import {
  DEFAULT_PREVIEW_SIZE,
  type SpinnerItem,
  type SpinnerOptions,
} from "@/components/spinners";
import type { SnippetProps } from "@/lib/snippet";

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

function useCustomizationState(item: SpinnerItem): SpinnerCustomizationState {
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

export function snippetProps(
  item: SpinnerItem,
  state: SpinnerCustomizationState
): SnippetProps {
  const props: SnippetProps = { size: state.size };

  if (state.color) {
    props.color = state.color;
  }

  if (state.speedMs !== SPINNER_MOTION[item.slug]) {
    props.duration = state.speedMs;
  }

  for (const option of item.options ?? []) {
    const value = state.options[option.prop];
    if (value !== undefined && value !== option.defaultValue) {
      props[option.prop] = value;
    }
  }

  return props;
}

interface CustomizationContextValue {
  item: SpinnerItem;
  state: SpinnerCustomizationState;
}

const CustomizationContext = createContext<CustomizationContextValue | null>(
  null
);

export function CustomizationProvider({
  children,
  item,
}: {
  children: ReactNode;
  item: SpinnerItem;
}) {
  const state = useCustomizationState(item);
  return (
    <CustomizationContext.Provider value={{ item, state }}>
      {children}
    </CustomizationContext.Provider>
  );
}

export function useCustomization(): CustomizationContextValue {
  const value = useContext(CustomizationContext);
  if (!value) {
    throw new Error(
      "useCustomization must be used inside a CustomizationProvider"
    );
  }
  return value;
}
