import type { CSSProperties } from "react";
import { SpinnerStyle, spinnerRoot } from "./frame";
import { duration, PLAY_STATE, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

// The eight ring cells in grid order, each with its place clockwise from the
// top-left corner. The centre of the grid stays empty.
const RING = [0, 1, 2, 7, null, 3, 6, 5, 4];

const CELLS = RING.map((place) => ({
  place,
  step: place === null ? null : (8 - place) % 8,
}));

const dur = duration("swirl");

const css = `
.ld-swirl {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: calc(${SIZE} * 0.15625);
  box-sizing: border-box;
  width: ${SIZE};
  height: ${SIZE};
  padding: calc(${SIZE} * 0.0625);
}

.ld-swirl-cell {
  background: currentColor;
  border-radius: calc(${SIZE} * 0.0625);
  animation: ld-swirl-fade ${dur} linear infinite;
  animation-delay: calc(${dur} * var(--ld-swirl-step) / -8);
  animation-play-state: ${PLAY_STATE};
}

@keyframes ld-swirl-fade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-swirl-cell {
    opacity: 0.6;
    animation: none;
  }
}
`;

export function Swirl(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="swirl">{css}</SpinnerStyle>
      <div {...spinnerRoot("swirl", props)}>
        {CELLS.map((cell, index) =>
          cell.step === null ? (
            <div key={index} />
          ) : (
            <div
              className="ld-swirl-cell"
              key={index}
              style={{ "--ld-swirl-step": cell.step } as CSSProperties}
            />
          )
        )}
      </div>
    </>
  );
}
