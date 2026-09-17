import { cssVars, SpinnerStyle, spinnerRoot } from "./frame";
import { duration, PLAY_STATE, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

const BLOCKS = [
  { x: 1, y: 1 },
  { x: -1, y: 1 },
  { x: 1, y: -1 },
  { x: -1, y: -1 },
];

const GAP = 24;

const GAP_IN = 8;

const BLOCK = (100 - GAP) / 2;

const PULL = `${(((GAP - GAP_IN) / 2 / BLOCK) * 100).toFixed(1)}%`;

const css = `
.ld-gather {
  width: ${SIZE};
  height: ${SIZE};
}

.ld-gather-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${GAP}%;
  width: 100%;
  height: 100%;
  animation: ld-gather-turn ${duration("gather")} ease-in-out infinite;
  animation-play-state: ${PLAY_STATE};
}

.ld-gather-block {
  background: currentColor;
  border-radius: calc(${SIZE} * 0.14);
  animation: ld-gather-pull ${duration("gather")} ease-in-out infinite;
  animation-play-state: ${PLAY_STATE};
}

@keyframes ld-gather-pull {
  0%,
  100% {
    transform: translate(0, 0);
  }
  30%,
  60% {
    transform: translate(
      calc(var(--ld-gather-x) * ${PULL}),
      calc(var(--ld-gather-y) * ${PULL})
    );
  }
}

@keyframes ld-gather-turn {
  0%,
  30% {
    transform: rotate(0);
  }
  60%,
  100% {
    transform: rotate(90deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-gather-group,
  .ld-gather-block {
    animation: none;
  }
}
`;

export function Gather(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="gather">{css}</SpinnerStyle>
      <div {...spinnerRoot("gather", props)}>
        <div className="ld-gather-group">
          {BLOCKS.map(({ x, y }) => (
            <div
              className="ld-gather-block"
              key={`${x}${y}`}
              style={cssVars({ "--ld-gather-x": x, "--ld-gather-y": y })}
            />
          ))}
        </div>
      </div>
    </>
  );
}
