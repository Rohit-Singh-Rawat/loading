import { SpinnerStyle, spinnerRoot } from "./frame";
import { duration, PLAY_STATE, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

const css = `
.ld-morph {
  width: ${SIZE};
  height: ${SIZE};
}

.ld-morph-shape {
  width: 64%;
  height: 64%;
  margin: 18%;
  background: currentColor;
  border-radius: calc(${SIZE} * 0.08);
  animation: ld-morph-round ${duration("morph")} ease-in-out infinite;
  animation-play-state: ${PLAY_STATE};
}

@keyframes ld-morph-round {
  0% {
    border-radius: calc(${SIZE} * 0.08);
    transform: rotate(0);
  }
  50% {
    border-radius: 50%;
    transform: rotate(45deg);
  }
  100% {
    border-radius: calc(${SIZE} * 0.08);
    transform: rotate(90deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-morph-shape {
    animation: none;
  }
}
`;

export function Morph(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="morph">{css}</SpinnerStyle>
      <div {...spinnerRoot("morph", props)}>
        <div className="ld-morph-shape" />
      </div>
    </>
  );
}
