import { cssVars, SpinnerStyle, spinnerRoot, step } from "./frame";
import { duration, PLAY_STATE, SIZE, stagger } from "./motion";
import type { SpinnerProps } from "./types";

// Panels in DOM order (top-left, top-right, bottom-left, bottom-right), each
// turned so its outer corner faces out and folding in clockwise order.
const PANELS = [
  { place: 0, turn: 0 },
  { place: 1, turn: 90 },
  { place: 3, turn: 270 },
  { place: 2, turn: 180 },
];

// The four panels fold an eighth of a cycle apart, so the last one has
// finished folding away before the first folds in again.
const SLOTS = 8;

const css = `
.ld-fold {
  width: ${SIZE};
  height: ${SIZE};
}

.ld-fold-diamond {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 70.7%;
  height: 70.7%;
  margin: 14.65%;
  transform: rotate(45deg);
}

.ld-fold-panel {
  position: relative;
  transform: scale(1.1) rotate(var(--ld-fold-turn));
}

.ld-fold-face {
  position: absolute;
  inset: 0;
  background: currentColor;
  transform-origin: 100% 100%;
  animation: ld-fold-angle ${duration("fold")} linear infinite both;
  animation-delay: ${stagger("fold", SLOTS)};
  animation-play-state: ${PLAY_STATE};
}

@keyframes ld-fold-angle {
  0%,
  10% {
    opacity: 0;
    transform: perspective(calc(${SIZE} * 2.5)) rotateX(-180deg);
  }
  25%,
  75% {
    opacity: 1;
    transform: perspective(calc(${SIZE} * 2.5)) rotateX(0);
  }
  90%,
  100% {
    opacity: 0;
    transform: perspective(calc(${SIZE} * 2.5)) rotateY(180deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-fold-face {
    animation: none;
  }
}
`;

export function Fold(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="fold">{css}</SpinnerStyle>
      <div {...spinnerRoot("fold", props)}>
        <div className="ld-fold-diamond">
          {PANELS.map(({ place, turn }) => (
            <div
              className="ld-fold-panel"
              key={turn}
              style={cssVars({ "--ld-fold-turn": `${turn}deg` })}
            >
              <div className="ld-fold-face" style={step(place)} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
