import { SpinnerStyle, spinnerRoot } from "./frame";
import { duration, PLAY_STATE, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

const DOTS = 3;

const css = `
.ld-ellipsis {
  width: ${SIZE};
  height: ${SIZE};
  background: radial-gradient(circle closest-side, currentColor 60%, transparent calc(60% + 1px)) 0 50% / calc(100% / ${DOTS}) 100% repeat-x;
  clip-path: inset(0 0 0 0);
  animation: ld-ellipsis-type ${duration("ellipsis")} steps(${DOTS + 1}, jump-none) infinite;
  animation-play-state: ${PLAY_STATE};
}

@keyframes ld-ellipsis-type {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-ellipsis {
    animation: none;
  }
}
`;

export function Ellipsis(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="ellipsis">{css}</SpinnerStyle>
      <div {...spinnerRoot("ellipsis", props)} />
    </>
  );
}
