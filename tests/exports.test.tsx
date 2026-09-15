import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  Arc,
  BouncingDots,
  CircularDots,
  Classic,
  ClassicV2,
  Clock,
  Comet,
  Compass,
  DEFAULT_EASING,
  LinearDots,
  Orbit,
  Pulse,
  Radar,
  Ring,
  SPINNERS,
  Swirl,
} from "../src";

const NAMED_SPINNERS = {
  arc: Arc,
  "bouncing-dots": BouncingDots,
  "circular-dots": CircularDots,
  classic: Classic,
  "classic-v2": ClassicV2,
  clock: Clock,
  comet: Comet,
  compass: Compass,
  "linear-dots": LinearDots,
  orbit: Orbit,
  pulse: Pulse,
  radar: Radar,
  ring: Ring,
  swirl: Swirl,
} satisfies typeof SPINNERS;

describe("public exports", () => {
  it("exports every registered spinner by its public name", () => {
    expect(NAMED_SPINNERS).toEqual(SPINNERS);
  });

  it.each([Arc, Clock, Comet, Orbit, Radar, Ring])(
    "uses the exported default when easing is omitted",
    (Spinner) => {
      expect(renderToStaticMarkup(<Spinner />)).toBe(
        renderToStaticMarkup(<Spinner easing={DEFAULT_EASING} />)
      );
    }
  );
});
