import { SpinnerStyle, spinnerRoot } from "./frame";
import { duration, PLAY_STATE, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

const CELLS = Array.from({ length: 16 }, (_, index) => index);

const dur = duration("grid");

const ROW_RULES = [1, 2, 3]
  .map((row) => {
    const first = row * 4 + 1;
    return `
.ld-grid-cell:nth-child(n + ${first}):nth-child(-n + ${first + 3}) {
  animation-delay: calc(${dur} * -${((4 - row) / 4).toFixed(2)});
}`;
  })
  .join("\n");

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
  animation-play-state: ${PLAY_STATE};
}
${ROW_RULES}

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

export function Grid(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="grid">{css}</SpinnerStyle>
      <div {...spinnerRoot("grid", props)}>
        {CELLS.map((cell) => (
          <div className="ld-grid-cell" key={cell} />
        ))}
      </div>
    </>
  );
}
