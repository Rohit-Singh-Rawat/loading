import { SpinnerStyle, spinnerRoot } from "./frame";
import { duration, PLAY_STATE, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

const css = `
.ld-collapse {
  position: relative;
  width: ${SIZE};
  height: ${SIZE};
}

.ld-collapse-ring {
  position: absolute;
  inset: 0;
  box-sizing: border-box;
  border: calc(${SIZE} * 0.12) solid currentColor;
  border-radius: 50%;
  animation: ld-collapse-breathe ${duration("collapse")} ease-in-out infinite;
  animation-play-state: ${PLAY_STATE};
}

@keyframes ld-collapse-breathe {
  0%,
  100% {
    inset: 0;
    border-width: calc(${SIZE} * 0.12);
  }
  45%,
  55% {
    inset: 32%;
    border-width: calc(${SIZE} * 0.18);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-collapse-ring {
    animation: none;
  }
}
`;

export function Collapse(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="collapse">{css}</SpinnerStyle>
      <div {...spinnerRoot("collapse", props)}>
        <div className="ld-collapse-ring" />
      </div>
    </>
  );
}
