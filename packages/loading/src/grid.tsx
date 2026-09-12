import { cssVars, SpinnerStyle, spinnerRoot } from "./frame";
import { duration, PLAY_STATE, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

export type GridDirection = "columns" | "diagonal" | "rows";

export interface GridProps extends SpinnerProps {
  direction?: GridDirection;
}

const CELLS = Array.from({ length: 16 }, (_, index) => ({
  column: index % 4,
  row: Math.floor(index / 4),
}));

const STEPS = 4;

function step(cell: (typeof CELLS)[number], direction: GridDirection) {
  if (direction === "columns") {
    return cell.column;
  }
  if (direction === "diagonal") {
    return (cell.row + cell.column) % STEPS;
  }
  return cell.row;
}

const dur = duration("grid");

const css = `
.ld-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: calc(${SIZE} / 7);
  width: ${SIZE};
  height: ${SIZE};
}

.ld-grid-cell {
  background: currentColor;
  animation: ld-grid-wave ${dur} linear infinite;
  animation-delay: calc(${dur} * (var(--ld-grid-step) - ${STEPS}) / ${STEPS});
  animation-play-state: ${PLAY_STATE};
}

@keyframes ld-grid-wave {
  0%, 24.99% {
    opacity: 1;
  }
  25%, 49.99% {
    opacity: 0.6;
  }
  50%, 74.99% {
    opacity: 0.4;
  }
  75%, 100% {
    opacity: 0.2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-grid-cell {
    opacity: 0.5;
    animation: none;
  }
}
`;

export function Grid({ direction = "rows", ...rest }: GridProps) {
  return (
    <>
      <SpinnerStyle name="grid">{css}</SpinnerStyle>
      <div {...spinnerRoot("grid", rest)}>
        {CELLS.map((cell, index) => (
          <div
            className="ld-grid-cell"
            key={index}
            style={cssVars({ "--ld-grid-step": step(cell, direction) })}
          />
        ))}
      </div>
    </>
  );
}
