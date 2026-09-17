import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  Arc,
  Atom,
  Blocks,
  BouncingDots,
  Cascade,
  CircularDots,
  Classic,
  ClassicV2,
  Clock,
  Comet,
  Compass,
  DEFAULT_BLOCKS_SWEEP,
  DEFAULT_CAP,
  DEFAULT_EASING,
  DEFAULT_RIPPLE_DIRECTION,
  DEFAULT_WAVE_ORIGIN,
  Dual,
  Eclipse,
  Flip,
  Gather,
  Leap,
  LinearDots,
  Loading,
  Morph,
  Orbit,
  Pulse,
  Radar,
  Ring,
  Ripple,
  Slide,
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
  cascade: Cascade,
  "circular-dots": CircularDots,
  classic: Classic,
  "classic-v2": ClassicV2,
  clock: Clock,
  comet: Comet,
  compass: Compass,
  dual: Dual,
  eclipse: Eclipse,
  flip: Flip,
  gather: Gather,
  leap: Leap,
  "linear-dots": LinearDots,
  loading: Loading,
  morph: Morph,
  orbit: Orbit,
  pulse: Pulse,
  radar: Radar,
  ring: Ring,
  ripple: Ripple,
  slide: Slide,
  snake: Snake,
  swirl: Swirl,
  trace: Trace,
  wave: Wave,
} satisfies typeof SPINNERS;

describe("public exports", () => {
  it("exports every registered spinner by its public name", () => {
    expect(NAMED_SPINNERS).toEqual(SPINNERS);
  });

  it.each([Arc, Atom, Clock, Comet, Dual, Orbit, Radar, Ring, Snake, Trace])(
    "uses the exported default when easing is omitted",
    (Spinner) => {
      expect(renderToStaticMarkup(<Spinner />)).toBe(
        renderToStaticMarkup(<Spinner easing={DEFAULT_EASING} />)
      );
    }
  );

  it.each([Arc, Cascade, Dual, Ring, Snake, Trace])(
    "uses the exported default when cap is omitted",
    (Spinner) => {
      expect(renderToStaticMarkup(<Spinner />)).toBe(
        renderToStaticMarkup(<Spinner cap={DEFAULT_CAP} />)
      );
    }
  );

  it("uses the exported defaults when a spinner's own prop is omitted", () => {
    expect(renderToStaticMarkup(<Blocks />)).toBe(
      renderToStaticMarkup(<Blocks sweep={DEFAULT_BLOCKS_SWEEP} />)
    );
    expect(renderToStaticMarkup(<Ripple />)).toBe(
      renderToStaticMarkup(<Ripple direction={DEFAULT_RIPPLE_DIRECTION} />)
    );
    expect(renderToStaticMarkup(<Wave />)).toBe(
      renderToStaticMarkup(<Wave origin={DEFAULT_WAVE_ORIGIN} />)
    );
  });
});
