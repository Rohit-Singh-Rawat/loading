import { SpinnerStyle, spinnerRoot } from "./frame";
import { duration, PLAY_STATE, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

const css = `
.ld-hourglass {
  width: ${SIZE};
  height: ${SIZE};
  background: currentColor;
  clip-path: polygon(15% 0, 85% 0, 56% 50%, 85% 100%, 15% 100%, 44% 50%);
  animation: ld-hourglass-flip ${duration("hourglass")} ease-in-out infinite;
  animation-play-state: ${PLAY_STATE};
}

@keyframes ld-hourglass-flip {
  0%,
  65% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-hourglass {
    animation: none;
  }
}
`;

export function Hourglass(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="hourglass">{css}</SpinnerStyle>
      <div {...spinnerRoot("hourglass", props)} />
    </>
  );
}
