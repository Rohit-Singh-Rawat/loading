import { cssVars, SpinnerStyle, spinnerRoot } from "./frame";
import { duration, PLAY_STATE, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

// Each block's corner and the direction it pulls in from.
const BLOCKS = [
  { corner: "top: 0; left: 0", x: 1, y: 1 },
  { corner: "top: 0; right: 0", x: -1, y: 1 },
  { corner: "bottom: 0; left: 0", x: 1, y: -1 },
  { corner: "bottom: 0; right: 0", x: -1, y: -1 },
];

const css = `
.ld-gather {
  width: ${SIZE};
  height: ${SIZE};
}

.ld-gather-group {
  position: relative;
  width: 100%;
  height: 100%;
  animation: ld-gather-turn ${duration("gather")} ease-in-out infinite;
  animation-play-state: ${PLAY_STATE};
}

.ld-gather-block {
  position: absolute;
  width: 40%;
  height: 40%;
  background: currentColor;
  border-radius: calc(${SIZE} * 0.14);
  animation: ld-gather-pull ${duration("gather")} ease-in-out infinite;
  animation-play-state: ${PLAY_STATE};
}
${BLOCKS.map(
  ({ corner }, index) => `
.ld-gather-block:nth-child(${index + 1}) {
  ${corner};
}
`
).join("")}
@keyframes ld-gather-pull {
  0%,
  100% {
    transform: translate(0, 0);
  }
  30%,
  60% {
    transform: translate(
      calc(var(--ld-gather-x) * 15%),
      calc(var(--ld-gather-y) * 15%)
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
