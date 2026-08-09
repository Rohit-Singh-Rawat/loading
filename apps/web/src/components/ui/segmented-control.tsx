"use client";

import { m } from "motion/react";
import { useId } from "react";
import { cn } from "@/lib/utils";

const INDICATOR_TRANSITION = {
  bounce: 0,
  duration: 0.3,
  type: "spring",
} as const;

export function SegmentedControl<Value extends string | number>({
  label,
  onValueChange,
  options,
  value,
}: {
  label: string;
  onValueChange: (value: Value) => void;
  options: readonly { label: string; value: Value }[];
  value: Value;
}) {
  const groupId = useId();

  return (
    <fieldset
      aria-label={label}
      className="flex h-8 w-full items-center rounded-lg bg-gray-200"
    >
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <label
            className={cn(
              "relative flex h-8 min-w-0 flex-1 cursor-pointer items-center justify-center rounded-lg font-medium text-sm transition-colors duration-200 ease-out",
              "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gray-1100 has-[:focus-visible]:outline-offset-2",
              isActive
                ? "text-gray-1200"
                : "text-gray-1000 hover-hover:hover:text-gray-1200"
            )}
            key={option.value}
          >
            <input
              checked={isActive}
              className="sr-only"
              name={groupId}
              onChange={() => onValueChange(option.value)}
              type="radio"
              value={String(option.value)}
            />
            {isActive && (
              <m.span
                className="pointer-events-none absolute inset-0 rounded-lg border border-gray-400 bg-gray-300"
                layoutId={`segmented-control-${groupId}`}
                transition={INDICATOR_TRANSITION}
              />
            )}
            <span className="relative z-10 select-none">{option.label}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
