import { SpinnerStyle, spinnerRoot } from "./frame";
import { duration, PLAY_STATE, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

// A figure eight, x = A cos t and y = B sin 2t, as percentages of the box.
const A = 42;
const B = 21;
const DOT = 20;
const STOPS = 16;
const TRAILING_ZEROS = /\.?0+$/;

function at(t: number): [number, number] {
  return [A * Math.cos(t), B * Math.sin(2 * t)];
}

// The dot moves in percentages of its own size, the way `classic` places its
// bars, so the path scales with the box without an `offset-path`.
const keyframes = Array.from({ length: STOPS + 1 }, (_, stop) => {
  const [x, y] = at((2 * Math.PI * stop) / STOPS);
  const offset = ((100 * stop) / STOPS).toFixed(2).replace(TRAILING_ZEROS, "");
  const dx = ((x / DOT) * 100).toFixed(1);
  const dy = ((y / DOT) * 100).toFixed(1);
  return `  ${offset}% { transform: translate(${dx}%, ${dy}%); }`;
}).join("\n");

const TRACK = Array.from({ length: 65 }, (_, point) => {
  const [x, y] = at((2 * Math.PI * point) / 64);
  return `${(50 + x).toFixed(1)},${(50 + y).toFixed(1)}`;
}).join(" ");

const css = `
.ld-figure-eight {
  position: relative;
  width: ${SIZE};
  height: ${SIZE};
}

.ld-figure-eight-track {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.ld-figure-eight-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${DOT}%;
  height: ${DOT}%;
  margin: -${DOT / 2}% 0 0 -${DOT / 2}%;
  background: currentColor;
  border-radius: 50%;
  animation: ld-figure-eight-trace ${duration("figure-eight")} linear infinite;
  animation-play-state: ${PLAY_STATE};
}

@keyframes ld-figure-eight-trace {
${keyframes}
}

@media (prefers-reduced-motion: reduce) {
  .ld-figure-eight-dot {
    animation: none;
  }
}
`;

export function FigureEight(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="figure-eight">{css}</SpinnerStyle>
      <div {...spinnerRoot("figure-eight", props)}>
        <svg
          className="ld-figure-eight-track"
          fill="none"
          role="presentation"
          viewBox="0 0 100 100"
        >
          <polyline
            opacity="0.2"
            points={TRACK}
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="10"
          />
        </svg>
        <div className="ld-figure-eight-dot" />
      </div>
    </>
  );
}
