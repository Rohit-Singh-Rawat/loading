import { DEFAULT_SIZE, SIZE, SpinnerStyle, spinnerRoot } from "./frame";
import { duration, PLAY_STATE } from "./motion";
import type { SpinnerProps } from "./types";

const BARS = Array.from({ length: 12 }, (_, index) => index);

const dur = duration("classic");

const BAR_RULES = BARS.map(
  (bar) => `
.ld-classic-bar:nth-child(${bar + 1}) {
  transform: rotate(${bar === 0 ? "0.0001" : bar * 30}deg) translate(146%);
  animation-delay: calc(${dur} * ${(bar / 12 - 1).toFixed(4)});
}`
).join("\n");

const css = `
.ld-classic {
  width: ${SIZE};
  height: ${SIZE};
}

.ld-classic-inner {
  position: relative;
  top: 50%;
  left: 50%;
  width: ${SIZE};
  height: ${SIZE};
}

.ld-classic-bar {
  position: absolute;
  top: -3.9%;
  left: -10%;
  width: 24%;
  height: 8%;
  background: currentColor;
  border-radius: 6px;
  animation: ld-classic-spin ${dur} linear infinite;
  animation-play-state: ${PLAY_STATE};
}
${BAR_RULES}

@keyframes ld-classic-spin {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.15;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-classic-bar {
    opacity: 0.5;
    animation: none;
  }
}
`;

export function Classic({ size = DEFAULT_SIZE, className }: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="classic">{css}</SpinnerStyle>
      <div {...spinnerRoot("classic", { className, size })}>
        <div className="ld-classic-inner">
          {BARS.map((bar) => (
            <div className="ld-classic-bar" key={bar} />
          ))}
        </div>
      </div>
    </>
  );
}
