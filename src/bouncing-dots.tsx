import { SpinnerStyle, spinnerRoot } from "./frame";
import { duration, PLAY_STATE, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

const DOTS = Array.from({ length: 3 }, (_, index) => index);

const dur = duration("bouncing-dots");

const css = `
.ld-bouncing-dots {
  display: flex;
  align-items: center;
  gap: calc(${SIZE} * 0.2);
  height: ${SIZE};
}

.ld-bouncing-dots-dot {
  width: calc(${SIZE} * 0.22);
  height: calc(${SIZE} * 0.22);
  background: currentColor;
  border-radius: 9999px;
  animation: ld-bouncing-dots-bounce ${dur} ease-in-out infinite alternate;
  animation-play-state: ${PLAY_STATE};
}

.ld-bouncing-dots-dot:nth-child(1) {
  animation-delay: calc(${dur} * -0.64);
}

.ld-bouncing-dots-dot:nth-child(2) {
  animation-delay: calc(${dur} * -0.32);
}

@keyframes ld-bouncing-dots-bounce {
  from {
    transform: translateY(28%);
  }
  to {
    transform: translateY(-72%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-bouncing-dots-dot {
    animation: none;
  }
}
`;

export function BouncingDots(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="bouncing-dots">{css}</SpinnerStyle>
      <div {...spinnerRoot("bouncing-dots", props)}>
        {DOTS.map((dot) => (
          <div className="ld-bouncing-dots-dot" key={dot} />
        ))}
      </div>
    </>
  );
}
