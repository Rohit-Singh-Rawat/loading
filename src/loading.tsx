import { SpinnerStyle, spinnerRoot, step } from "./frame";
import { duration, PLAY_STATE, SIZE, stagger } from "./motion";
import type { SpinnerProps } from "./types";

// The loading.dev mark: eight 2×2 blocks of pixels on a 15-unit grid, listed
// clockwise from the right so the brightest one travels that way.
const SEGMENTS = [
  { x: 12, y: 6 },
  { x: 10, y: 10 },
  { x: 6, y: 12 },
  { x: 2, y: 10 },
  { x: 0, y: 6 },
  { x: 2, y: 2 },
  { x: 6, y: 0 },
  { x: 10, y: 2 },
];

const css = `
.ld-loading {
  width: ${SIZE};
  height: ${SIZE};
}

.ld-loading-segment {
  animation: ld-loading-fade ${duration("loading")} linear infinite;
  animation-delay: ${stagger("loading", SEGMENTS.length)};
  animation-play-state: ${PLAY_STATE};
}

@keyframes ld-loading-fade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-loading-segment {
    opacity: 0.6;
    animation: none;
  }
}
`;

export function Loading(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="loading">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("loading", props)}
        fill="currentColor"
        role="presentation"
        viewBox="0 0 15 15"
      >
        {SEGMENTS.map(({ x, y }, segment) => (
          <g
            className="ld-loading-segment"
            key={`${x}-${y}`}
            style={step(segment)}
            transform={`translate(${x} ${y})`}
          >
            <rect height="1" width="1" x="0" y="0" />
            <rect height="1" width="1" x="2" y="0" />
            <rect height="1" width="1" x="0" y="2" />
            <rect height="1" width="1" x="2" y="2" />
          </g>
        ))}
      </svg>
    </>
  );
}
