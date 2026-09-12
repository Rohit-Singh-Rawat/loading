import type { CSSProperties } from "react";
import { SpinnerStyle, spinnerRoot } from "./frame";
import { duration, PLAY_STATE, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

/** The shape of each cell: rounded squares or circles. */
export type DriveShape = "circle" | "square";

export interface DriveProps extends SpinnerProps {
  /** The shape of each cell. Defaults to `square`. */
  shape?: DriveShape;
}

const COLUMNS = 3;

// A lit arrowhead — one full column plus the middle cell of the next — drives
// one column to the right each third of a cycle and wraps around. Cells in the
// middle row are lit for two thirds: as the tip of one arrow, then as the base
// of the next. Each cell's step is where in the cycle its lit window starts.
const CELLS = Array.from({ length: COLUMNS * COLUMNS }, (_, index) => {
  const column = index % COLUMNS;
  const middle = Math.floor(index / COLUMNS) === 1;
  const start = middle ? (column + COLUMNS - 1) % COLUMNS : column;
  return { middle, step: (COLUMNS - start) % COLUMNS };
});

const dur = duration("drive");

const css = `
.ld-drive {
  display: grid;
  grid-template-columns: repeat(${COLUMNS}, 1fr);
  grid-template-rows: repeat(${COLUMNS}, 1fr);
  gap: calc(${SIZE} * 0.15625);
  box-sizing: border-box;
  width: ${SIZE};
  height: ${SIZE};
  padding: calc(${SIZE} * 0.0625);
}

.ld-drive-cell {
  background: currentColor;
  border-radius: calc(${SIZE} * 0.03125);
  animation: ld-drive-column ${dur} linear infinite;
  animation-delay: calc(${dur} * var(--ld-drive-step) / -${COLUMNS});
  animation-play-state: ${PLAY_STATE};
}

.ld-drive-cell-circle {
  border-radius: 9999px;
}

.ld-drive-cell-middle {
  animation-name: ld-drive-middle;
}

@keyframes ld-drive-column {
  0%, 33.32% {
    opacity: 1;
  }
  33.33%, 100% {
    opacity: 0.4;
  }
}

@keyframes ld-drive-middle {
  0%, 66.65% {
    opacity: 1;
  }
  66.66%, 100% {
    opacity: 0.4;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-drive-cell {
    opacity: 0.4;
    animation: none;
  }
}
`;

export function Drive({ shape = "square", ...rest }: DriveProps) {
  return (
    <>
      <SpinnerStyle name="drive">{css}</SpinnerStyle>
      <div {...spinnerRoot("drive", rest)}>
        {CELLS.map((cell, index) => (
          <div
            className={[
              "ld-drive-cell",
              cell.middle && "ld-drive-cell-middle",
              shape === "circle" && "ld-drive-cell-circle",
            ]
              .filter(Boolean)
              .join(" ")}
            key={index}
            style={{ "--ld-drive-step": cell.step } as CSSProperties}
          />
        ))}
      </div>
    </>
  );
}
