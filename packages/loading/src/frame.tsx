import type { CSSProperties } from "react";
import { classNames } from "./class-names";
import { SIZE_VAR, type SpinnerName } from "./motion";
import type { SpinnerProps } from "./types";

export function SpinnerStyle({
  children,
  name,
}: {
  children: string;
  name: SpinnerName;
}) {
  return (
    <style href={`ld-${name}`} precedence="loading-dev">
      {children}
    </style>
  );
}

export function spinnerRoot(
  name: SpinnerName,
  { className, size }: SpinnerProps & { size: number }
) {
  return {
    "aria-hidden": true,
    className: classNames(`ld-${name}`, className),
    style: { [SIZE_VAR]: `${size}px` } as CSSProperties,
  };
}
