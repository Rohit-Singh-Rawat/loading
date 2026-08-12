import type { CSSProperties } from "react";
import { classNames } from "./class-names";
import type { SpinnerProps } from "./types";

const CELLS = Array.from({ length: 16 }, (_, index) => index);

const ROW_RULES = [1, 2, 3]
  .map((row) => {
    const first = row * 4 + 1;
    return `
.ld-grid-cell:nth-child(n + ${first}):nth-child(-n + ${first + 3}) {
  animation-delay: calc(var(--ld-duration, 1.2s) * -${((4 - row) / 4).toFixed(2)});
}`;
  })
  .join("\n");

const css = `
.ld-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: calc(var(--spinner-size, 20px) / 7);
  width: var(--spinner-size, 20px);
  height: var(--spinner-size, 20px);
}

.ld-grid-cell {
  background: currentColor;
  animation: ld-grid-wave var(--ld-duration, 1.2s) linear infinite;
  animation-play-state: var(--ld-play-state, running);
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

export function Grid({ size = 20, className }: SpinnerProps) {
  return (
    <>
      <style href="ld-grid" precedence="loading-dev">
        {css}
      </style>
      <div
        aria-hidden="true"
        className={classNames("ld-grid", className)}
        style={{ "--spinner-size": `${size}px` } as CSSProperties}
      >
        {CELLS.map((cell) => (
          <div className="ld-grid-cell" key={cell} />
        ))}
      </div>
    </>
  );
}
