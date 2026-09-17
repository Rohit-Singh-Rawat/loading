import { SpinnerStyle, spinnerRoot } from "./frame";
import { duration, PLAY_STATE, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

const SIDE = 17.5;
const RADIUS = 4;
// Four straight runs plus one full circle's worth of corners.
const PERIMETER = 4 * (SIDE - 2 * RADIUS) + 2 * Math.PI * RADIUS;
const DASH = 16;

const css = `
.ld-trace {
  width: ${SIZE};
  height: ${SIZE};
}

.ld-trace-dash {
  animation: ld-trace-run ${duration("trace")} linear infinite;
  animation-play-state: ${PLAY_STATE};
}

@keyframes ld-trace-run {
  to {
    stroke-dashoffset: ${-PERIMETER};
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-trace-dash {
    animation: none;
  }
}
`;

export function Trace(props: SpinnerProps) {
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
        {...spinnerRoot("trace", props)}
        fill="none"
        role="presentation"
        viewBox="0 0 20 20"
      >
        <rect {...rect} opacity="0.2" stroke="currentColor" strokeWidth="2.5" />
        <rect
          {...rect}
          className="ld-trace-dash"
          stroke="currentColor"
          strokeDasharray={`${DASH} ${PERIMETER - DASH}`}
          strokeLinecap="round"
          strokeWidth="2.5"
        />
      </svg>
    </>
  );
}
