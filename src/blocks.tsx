import { SpinnerStyle, spinnerRoot, step } from "./frame";
import { duration, PLAY_STATE, SIZE, stagger } from "./motion";
import type { SpinnerProps } from "./types";

export type BlocksWave = "columns" | "diagonal" | "rows";

export const DEFAULT_BLOCKS_WAVE: BlocksWave = "diagonal";

export interface BlocksProps extends SpinnerProps {
  /**
   * Which way the wave runs through the grid. `diagonal` goes from the top
   * left corner to the bottom right, `rows` from top to bottom, `columns` from
   * left to right. Defaults to `diagonal`.
   */
  wave?: BlocksWave;
}

const SIDE = 3;

const CELLS = Array.from({ length: SIDE * SIDE }, (_, index) => ({
  col: index % SIDE,
  row: Math.floor(index / SIDE),
}));

const WAVES: Record<
  BlocksWave,
  { count: number; place: (cell: (typeof CELLS)[number]) => number }
> = {
  columns: { count: SIDE, place: ({ col }) => col },
  diagonal: { count: SIDE * 2 - 1, place: ({ col, row }) => row + col },
  rows: { count: SIDE, place: ({ row }) => row },
};

const css = `
.ld-blocks {
  display: grid;
  grid-template-columns: repeat(${SIDE}, 1fr);
  grid-template-rows: repeat(${SIDE}, 1fr);
  gap: calc(${SIZE} * 0.1);
  width: ${SIZE};
  height: ${SIZE};
}

.ld-blocks-cell {
  background: currentColor;
  border-radius: calc(${SIZE} * 0.0625);
  animation: ld-blocks-wave ${duration("blocks")} ease-in-out infinite;
  animation-delay: ${stagger("blocks", WAVES.diagonal.count)};
  animation-play-state: ${PLAY_STATE};
}

.ld-blocks-cell-columns,
.ld-blocks-cell-rows {
  animation-delay: ${stagger("blocks", SIDE)};
}

@keyframes ld-blocks-wave {
  0%,
  70%,
  100% {
    transform: scale(1);
  }
  35% {
    transform: scale(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-blocks-cell {
    transform: scale(0.8);
    animation: none;
  }
}
`;

export function Blocks({ wave = DEFAULT_BLOCKS_WAVE, ...rest }: BlocksProps) {
  const cell =
    wave === "diagonal"
      ? "ld-blocks-cell"
      : `ld-blocks-cell ld-blocks-cell-${wave}`;
  const { place } = WAVES[wave];
  return (
    <>
      <SpinnerStyle name="blocks">{css}</SpinnerStyle>
      <div {...spinnerRoot("blocks", rest)}>
        {CELLS.map((position, index) => (
          <div className={cell} key={index} style={step(place(position))} />
        ))}
      </div>
    </>
  );
}
