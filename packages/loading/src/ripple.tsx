import type { CSSProperties } from "react";
import { classNames } from "./class-names";
import type { SpinnerProps } from "./types";

/** 4×4 grid: the inner square pulses, then the edge midpoints, then it rests. */
const GROUPS = [
  "corner",
  "edge",
  "edge",
  "corner",
  "edge",
  "inner",
  "inner",
  "edge",
  "edge",
  "inner",
  "inner",
  "edge",
  "corner",
  "edge",
  "edge",
  "corner",
];

const CELLS = GROUPS.map((group, index) => ({ group, id: index }));

const css = `
.ld-ripple {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: calc(var(--spinner-size, 20px) / 7);
  width: var(--spinner-size, 20px);
  height: var(--spinner-size, 20px);
}

.ld-ripple-cell {
  background: currentColor;
  opacity: 0.4;
}

.ld-ripple-inner,
.ld-ripple-edge {
  animation: ld-ripple-pulse var(--ld-duration, 1.2s) linear infinite;
  animation-play-state: var(--ld-play-state, running);
}

.ld-ripple-edge {
  animation-delay: calc(var(--ld-duration, 1.2s) * -0.6667);
}

@keyframes ld-ripple-pulse {
  0%, 33.32% {
    opacity: 0.4;
  }
  33.33%, 66.65% {
    opacity: 1;
  }
  66.66%, 100% {
    opacity: 0.4;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-ripple-inner,
  .ld-ripple-edge {
    animation: none;
  }
}
`;

export function Ripple({ size = 20, className }: SpinnerProps) {
  return (
    <>
      <style href="ld-ripple" precedence="loading-dev">
        {css}
      </style>
      <div
        aria-hidden="true"
        className={classNames("ld-ripple", className)}
        style={{ "--spinner-size": `${size}px` } as CSSProperties}
      >
        {CELLS.map((cell) => (
          <div
            className={
              cell.group === "corner"
                ? "ld-ripple-cell"
                : `ld-ripple-cell ld-ripple-${cell.group}`
            }
            key={cell.id}
          />
        ))}
      </div>
    </>
  );
}
