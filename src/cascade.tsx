import { SpinnerStyle, spinnerRoot, step } from "./frame";
import { duration, PLAY_STATE, SIZE, stagger } from "./motion";
import type { SpinnerProps } from "./types";

const RADII = [10.5, 7, 3.5];

// The arcs start a twenty-fourth of a cycle apart. The overshoot in the
// easing is the spinner: it fans them into a spiral where the turn is fast
// and lines them up where it winds back.
const SLOTS = 24;

const css = `
.ld-cascade {
  width: ${SIZE};
  height: ${SIZE};
}

.ld-cascade-arc {
  transform-origin: center;
  animation: ld-cascade-turn ${duration("cascade")} cubic-bezier(0.68, -0.75, 0.265, 1.75) infinite;
  animation-delay: ${stagger("cascade", SLOTS)};
  animation-play-state: ${PLAY_STATE};
}

@keyframes ld-cascade-turn {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-cascade-arc {
    animation: none;
  }
}
`;

export function Cascade(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="cascade">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("cascade", props)}
        fill="none"
        role="presentation"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        {RADII.map((r, index) => {
          const circumference = 2 * Math.PI * r;
          return (
            <circle
              className="ld-cascade-arc"
              cx="12"
              cy="12"
              key={r}
              r={r}
              strokeDasharray={`${circumference / 4} ${(circumference * 3) / 4}`}
              style={step(index)}
            />
          );
        })}
      </svg>
    </>
  );
}
