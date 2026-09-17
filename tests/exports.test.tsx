import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  Arc,
  Atom,
  Blocks,
  BouncingDots,
  Chase,
  CircularDots,
  Classic,
  ClassicV2,
  Clock,
  Comet,
  Compass,
  DEFAULT_BLOCKS_SWEEP,
  DEFAULT_EASING,
  DEFAULT_PENDULUM_PIVOT,
  DEFAULT_RIPPLE_DIRECTION,
  DEFAULT_WAVE_ORIGIN,
  Dual,
  FigureEight,
  Flip,
  LinearDots,
  Loading,
  Morph,
  Orbit,
  Pendulum,
  Pulse,
  Radar,
  Ring,
  Ripple,
  Snake,
  SPINNERS,
  Swirl,
  Trace,
  Wave,
} from "../src";

const NAMED_SPINNERS = {
  arc: Arc,
  atom: Atom,
  blocks: Blocks,
  "bouncing-dots": BouncingDots,
  chase: Chase,
  "circular-dots": CircularDots,
  classic: Classic,
  "classic-v2": ClassicV2,
  clock: Clock,
  comet: Comet,
  compass: Compass,
  dual: Dual,
  "figure-eight": FigureEight,
  flip: Flip,
  "linear-dots": LinearDots,
  loading: Loading,
  morph: Morph,
  orbit: Orbit,
  pendulum: Pendulum,
  pulse: Pulse,
  radar: Radar,
  ring: Ring,
  ripple: Ripple,
  snake: Snake,
  swirl: Swirl,
  trace: Trace,
  wave: Wave,
} satisfies typeof SPINNERS;

describe("public exports", () => {
  it("exports every registered spinner by its public name", () => {
    expect(NAMED_SPINNERS).toEqual(SPINNERS);
  });

  it.each([Arc, Atom, Clock, Comet, Dual, Orbit, Radar, Ring, Snake])(
    "uses the exported default when easing is omitted",
    (Spinner) => {
      expect(renderToStaticMarkup(<Spinner />)).toBe(
        renderToStaticMarkup(<Spinner easing={DEFAULT_EASING} />)
      );
    }
  );

  it("uses the exported defaults when a spinner's own prop is omitted", () => {
    expect(renderToStaticMarkup(<Blocks />)).toBe(
      renderToStaticMarkup(<Blocks sweep={DEFAULT_BLOCKS_SWEEP} />)
    );
    expect(renderToStaticMarkup(<Pendulum />)).toBe(
      renderToStaticMarkup(<Pendulum pivot={DEFAULT_PENDULUM_PIVOT} />)
    );
    expect(renderToStaticMarkup(<Ripple />)).toBe(
      renderToStaticMarkup(<Ripple direction={DEFAULT_RIPPLE_DIRECTION} />)
    );
    expect(renderToStaticMarkup(<Wave />)).toBe(
      renderToStaticMarkup(<Wave origin={DEFAULT_WAVE_ORIGIN} />)
    );
  });
});
