import { SpinnerStyle, spinnerRoot } from "./frame";
import { duration, PLAY_STATE, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

const css = `
@property --ld-pie-start {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

@property --ld-pie-end {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.ld-pie {
  --ld-pie-stroke: calc(${SIZE} * 0.14);
  width: ${SIZE};
  height: ${SIZE};
  border-radius: 9999px;
  background: conic-gradient(transparent var(--ld-pie-start), currentColor 0, currentColor var(--ld-pie-end), transparent 0);
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - var(--ld-pie-stroke)), #000 0);
  mask: radial-gradient(farthest-side, transparent calc(100% - var(--ld-pie-stroke)), #000 0);
  animation: ld-pie-sweep ${duration("pie")} linear infinite;
  animation-play-state: ${PLAY_STATE};
}

@keyframes ld-pie-sweep {
  0% {
    --ld-pie-start: 0deg;
    --ld-pie-end: 0deg;
  }
  50% {
    --ld-pie-start: 0deg;
    --ld-pie-end: 360deg;
  }
  100% {
    --ld-pie-start: 360deg;
    --ld-pie-end: 360deg;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-pie {
    --ld-pie-end: 90deg;
    animation: none;
  }
}
`;

export function Pie(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="pie">{css}</SpinnerStyle>
      <div {...spinnerRoot("pie", props)} />
    </>
  );
}
