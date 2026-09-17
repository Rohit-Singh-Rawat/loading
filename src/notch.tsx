import { SpinnerStyle, spinnerRoot } from "./frame";
import { duration, PLAY_STATE, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

// Each notch is a hole a third of the disc wide, centred on the disc's edge
// when open and pulled one hole-width outward when shut. Mask positions are
// percentages of the leftover space, so with a third-size hole the edge sits
// at -25% / 125% and fully outside at -50% / 150%.
const HOLE = "radial-gradient(circle closest-side, #000 99%, #0000)";

const OUT = ["50% -50%", "150% 50%", "50% 150%", "-50% 50%"];
const IN = ["50% -25%", "125% 50%", "50% 125%", "-25% 50%"];

function positions(open: number[]): string {
  return [
    ...OUT.map((out, hole) => (open.includes(hole) ? IN[hole] : out)),
    "0 0",
  ].join(", ");
}

// Notches open clockwise from the top, then shut in the same order.
const FRAMES = [
  [],
  [0],
  [0, 1],
  [0, 1, 2],
  [0, 1, 2, 3],
  [1, 2, 3],
  [2, 3],
  [3],
  [],
];

const css = `
.ld-notch {
  width: ${SIZE};
  height: ${SIZE};
}

.ld-notch-disc {
  width: 100%;
  height: 100%;
  background: currentColor;
  border-radius: 50%;
  mask-image: ${HOLE}, ${HOLE}, ${HOLE}, ${HOLE}, linear-gradient(#000 0 0);
  mask-size: 33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%, 100% 100%;
  mask-position: ${positions([])};
  mask-repeat: no-repeat;
  mask-composite: exclude;
  animation: ld-notch-cut ${duration("notch")} ease-in-out infinite;
  animation-play-state: ${PLAY_STATE};
}

@keyframes ld-notch-cut {
${FRAMES.map(
  (open, frame) => `  ${(frame * 100) / (FRAMES.length - 1)}% {
    mask-position: ${positions(open)};
  }`
).join("\n")}
}

@media (prefers-reduced-motion: reduce) {
  .ld-notch-disc {
    animation: none;
  }
}
`;

export function Notch(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="notch">{css}</SpinnerStyle>
      <div {...spinnerRoot("notch", props)}>
        <div className="ld-notch-disc" />
      </div>
    </>
  );
}
