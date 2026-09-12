import { type EasingProps, rotationCss, spinClass } from "./easing";
import { SpinnerStyle, spinnerRoot } from "./frame";
import { DEFAULT_SIZE } from "./motion";
import type { SpinnerProps } from "./types";

export interface RingProps extends SpinnerProps, EasingProps {}

const css = rotationCss("ring");

export function Ring({
  easing = "linear",
  size = DEFAULT_SIZE,
  ...rest
}: RingProps) {
  const arc = (
    <circle
      className={spinClass("ring", easing)}
      cx="12"
      cy="12"
    r="10"
     stroke="currentColor"
      strokeDasharray="16 46.8"
      strokeLinecap="round"
      strokeWidth="2.5"
    />
  );

  return (
    <>
      <SpinnerStyle name="ring">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("ring", { ...rest, size })}
        fill="none"
        height={size}
        role="presentation"
        viewBox="0 0 24 24"
        width={size}
      >
        <circle
          cx="12"
          cy="12"
          opacity="0.2"
          r="10"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        {easing === "stacked" ? <g className="ld-ring-layer">{arc}</g> : arc}
      </svg>
    </>
  );
}
