import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  Arc,
  Atom,
  Blocks,
  BouncingDots,
  CircularDots,
  Classic,
  ClassicV2,
  Clock,
  Comet,
  Compass,
  DEFAULT_BLOCKS_WAVE,
  DEFAULT_EASING,
  DEFAULT_RIPPLE_DIRECTION,
  DEFAULT_WAVE_ORIGIN,
  Ellipsis,
  Hourglass,
  LinearDots,
  Orbit,
  Pie,
  Pulse,
  Radar,
  Ring,
  Ripple,
  SPINNERS,
  Swirl,
  Wave,
} from "../src";

const NAMED_SPINNERS = {
  arc: Arc,
  atom: Atom,
  blocks: Blocks,
  "bouncing-dots": BouncingDots,
  "circular-dots": CircularDots,
  classic: Classic,
  "classic-v2": ClassicV2,
  clock: Clock,
  comet: Comet,
  compass: Compass,
  ellipsis: Ellipsis,
  hourglass: Hourglass,
  "linear-dots": LinearDots,
  orbit: Orbit,
  pie: Pie,
  pulse: Pulse,
  radar: Radar,
  ring: Ring,
  ripple: Ripple,
  swirl: Swirl,
  wave: Wave,
} satisfies typeof SPINNERS;

describe("public exports", () => {
  it("exports every registered spinner by its public name", () => {
    expect(NAMED_SPINNERS).toEqual(SPINNERS);
  });

  it.each([Arc, Atom, Clock, Comet, Orbit, Radar, Ring])(
    "uses the exported default when easing is omitted",
    (Spinner) => {
      expect(renderToStaticMarkup(<Spinner />)).toBe(
        renderToStaticMarkup(<Spinner easing={DEFAULT_EASING} />)
      );
    }
  );

  it("uses the exported defaults when a spinner's own prop is omitted", () => {
    expect(renderToStaticMarkup(<Blocks />)).toBe(
      renderToStaticMarkup(<Blocks wave={DEFAULT_BLOCKS_WAVE} />)
    );
    expect(renderToStaticMarkup(<Ripple />)).toBe(
      renderToStaticMarkup(<Ripple direction={DEFAULT_RIPPLE_DIRECTION} />)
    );
    expect(renderToStaticMarkup(<Wave />)).toBe(
      renderToStaticMarkup(<Wave origin={DEFAULT_WAVE_ORIGIN} />)
    );
  });
});
