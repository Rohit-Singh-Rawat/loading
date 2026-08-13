import { SpinnerStyle, spinnerRoot } from "./frame";
import { DEFAULT_SIZE, duration, PLAY_STATE, SIZE } from "./motion";
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

.ld-dot {
  width: calc(${SIZE} * 0.22);
  height: calc(${SIZE} * 0.22);
  background: currentColor;
  border-radius: 9999px;
  animation: ld-dots-bounce ${dur} ease-in-out infinite alternate;
  animation-play-state: ${PLAY_STATE};
}

.ld-dot:nth-child(1) {
  animation-delay: calc(${dur} * -0.64);
}

.ld-dot:nth-child(2) {
  animation-delay: calc(${dur} * -0.32);
}

@keyframes ld-dots-bounce {
  from {
    transform: translateY(28%);
  }
  to {
    transform: translateY(-72%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-dot {
    animation: none;
  }
}
`;

export function BouncingDots({ size = DEFAULT_SIZE, className }: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="bouncing-dots">{css}</SpinnerStyle>
      <div {...spinnerRoot("bouncing-dots", { className, size })}>
        {DOTS.map((dot) => (
          <div className="ld-dot" key={dot} />
        ))}
      </div>
    </>
  );
}
