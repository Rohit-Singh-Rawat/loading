import { type CapProps, linecap } from "./cap";
import { type EasingProps, rotationCss, spinClass } from "./easing";
import { SpinnerStyle, spinnerRoot } from "./frame";
import { SIZE } from "./motion";
import type { SpinnerProps } from "./types";

export interface TraceProps extends SpinnerProps, EasingProps, CapProps {}

const SIDE = 17.5;
const RADIUS = 4;
// Four straight runs plus one full circle's worth of corners.
const PERIMETER = 4 * (SIDE - 2 * RADIUS) + 2 * Math.PI * RADIUS;
const DASH = 16;

// One lap of the dash is one turn, so the easing contract applies as it does
// to a rotation; only the property that makes the lap differs.
const css = `
.ld-trace {
  width: ${SIZE};
  height: ${SIZE};
}

${rotationCss(
  "trace",
  `to {
    stroke-dashoffset: ${-PERIMETER};
  }`
)}
`;

export function Trace({ cap, easing, ...rest }: TraceProps) {
  const rect = {
    height: SIDE,
    rx: RADIUS,
    width: SIDE,
    x: (20 - SIDE) / 2,
    y: (20 - SIDE) / 2,
  };
  return (
    <>
      <SpinnerStyle name="trace">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("trace", rest)}
        fill="none"
        role="presentation"
        viewBox="0 0 20 20"
      >
        <rect {...rect} opacity="0.2" stroke="currentColor" strokeWidth="2.5" />
        <rect
          {...rect}
          className={spinClass("trace", easing)}
          stroke="currentColor"
          strokeDasharray={`${DASH} ${PERIMETER - DASH}`}
          strokeLinecap={linecap(cap)}
          strokeWidth="2.5"
        />
      </svg>
    </>
  );
}
