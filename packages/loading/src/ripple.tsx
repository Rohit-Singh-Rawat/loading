import { SpinnerStyle, spinnerRoot } from "./frame";
import { DEFAULT_SIZE, duration, PLAY_STATE, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

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

const dur = duration("ripple");

const css = `
.ld-ripple {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: calc(${SIZE} / 7);
  width: ${SIZE};
  height: ${SIZE};
}

.ld-ripple-cell {
  background: currentColor;
  opacity: 0.4;
}

.ld-ripple-inner,
.ld-ripple-edge {
  animation: ld-ripple-pulse ${dur} linear infinite;
  animation-play-state: ${PLAY_STATE};
}

.ld-ripple-edge {
  animation-delay: calc(${dur} * -0.6667);
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

export function Ripple({ size = DEFAULT_SIZE, className }: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="ripple">{css}</SpinnerStyle>
      <div {...spinnerRoot("ripple", { className, size })}>
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
