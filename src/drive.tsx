import { cssVars, SpinnerStyle, spinnerRoot } from "./frame";
import { duration, PLAY_STATE, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

export type DriveShape = "circle" | "square";

export interface DriveProps extends SpinnerProps {
  shape?: DriveShape;
}

const COLUMNS = 3;

// The lit cells form an arrowhead pointing right: one whole column, plus the
// middle cell of the column ahead as its tip. Each cell lists the column the
// arrowhead is in when it lights, so the middle row stays lit for two columns.
const LIT_AT = [
  [0, 1, 2],
  [2, 0, 1],
  [0, 1, 2],
];

const CELLS = LIT_AT.flatMap((row, rowIndex) =>
  row.map((step) => ({ middle: rowIndex === 1, step }))
);

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
  animation-delay: calc(${dur} * (var(--ld-drive-step) - ${COLUMNS}) / ${COLUMNS});
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
            style={cssVars({ "--ld-drive-step": cell.step })}
          />
        ))}
      </div>
    </>
  );
}
