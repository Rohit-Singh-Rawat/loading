import { type EasingProps, rotationCss, spinClass } from "./easing";
import { SpinnerStyle, spinnerRoot } from "./frame";
import { DEFAULT_SIZE } from "./motion";
import type { SpinnerProps } from "./types";

export interface ArcProps extends SpinnerProps, EasingProps {}

const css = rotationCss("arc");

export function Arc({ easing, size = DEFAULT_SIZE, ...rest }: ArcProps) {
  return (
    <>
      <SpinnerStyle name="arc">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("arc", { ...rest, size })}
        fill="none"
        height={size}
        role="presentation"
        viewBox="0 0 24 24"
        width={size}
      >
        <circle
          className={spinClass("arc", easing)}
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeDasharray="18 44.8"
          strokeLinecap="round"
          strokeWidth="2.5"
        />
      </svg>
    </>
  );
}
