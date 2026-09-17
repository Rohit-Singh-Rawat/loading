import { type EasingProps, rotationCss, spinClass } from "./easing";
import { SpinnerStyle, spinnerRoot } from "./frame";
import { duration, PLAY_STATE, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

export interface SnakeProps extends SpinnerProps, EasingProps {}

// The gap outruns the circumference (62.83), so the dash never wraps: at the
// end of the cycle only its first unit is still on the path, which is where the
// next cycle starts.
const css = `
.ld-snake {
  width: ${SIZE};
  height: ${SIZE};
}

${rotationCss("snake")}

.ld-snake-dash {
  animation: ld-snake-stretch ${duration("snake")} ease-in-out infinite;
  animation-play-state: ${PLAY_STATE};
}

@keyframes ld-snake-stretch {
  0% {
    stroke-dasharray: 1 100;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 45 100;
    stroke-dashoffset: -17;
  }
  100% {
    stroke-dasharray: 45 100;
    stroke-dashoffset: -62;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-snake-dash {
    stroke-dasharray: 18 100;
    animation: none;
  }
}
`;

export function Snake({ easing, ...rest }: SnakeProps) {
  return (
    <>
      <SpinnerStyle name="snake">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("snake", rest)}
        fill="none"
        role="presentation"
        viewBox="0 0 24 24"
      >
        <g className={spinClass("snake", easing)}>
          <circle
            className="ld-snake-dash"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.5"
          />
        </g>
      </svg>
    </>
  );
}
