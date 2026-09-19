import { SpinnerStyle, spinnerRoot, step } from "./frame";
import { animation, SIZE, stagger } from "./motion";
import type { SpinnerProps } from "./types";

const BLOCK = "M0 0h1v1H0zM2 0h1v1H2zM0 2h1v1H0zM2 2h1v1H2z";

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
  ${animation("loading", "ld-loading-fade", "linear")}
  animation-delay: ${stagger("loading", SEGMENTS.length)};
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
          <path
            className="ld-loading-segment"
            d={BLOCK}
            key={`${x}-${y}`}
            style={step(segment)}
            transform={`translate(${x} ${y})`}
          />
        ))}
      </svg>
    </>
  );
}
