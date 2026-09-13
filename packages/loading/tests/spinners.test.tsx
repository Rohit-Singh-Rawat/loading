import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  Arc,
  BouncingDots,
  CircularDots,
  Classic,
  Clock,
  Comet,
  Compass,
  Drive,
  Grid,
  LinearDots,
  Orbit,
  Pulse,
  Radar,
  Ring,
  Ripple,
  SPINNER_MOTION,
  Swirl,
} from "../src";

const spinners = {
  arc: Arc,
  "bouncing-dots": BouncingDots,
  "circular-dots": CircularDots,
  classic: Classic,
  clock: Clock,
  comet: Comet,
  compass: Compass,
  drive: Drive,
  grid: Grid,
  "linear-dots": LinearDots,
  orbit: Orbit,
  pulse: Pulse,
  radar: Radar,
  ring: Ring,
  ripple: Ripple,
  swirl: Swirl,
};

it("covers every spinner in the motion contract", () => {
  expect(Object.keys(spinners).sort()).toEqual(
    Object.keys(SPINNER_MOTION).sort()
  );
});

describe.each(Object.entries(spinners))("%s", (name, Spinner) => {
  it("renders decoratively without overriding inherited appearance or motion", () => {
    const html = renderToStaticMarkup(<Spinner />);

    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain(`class="ld-${name}"`);
    expect(html).toContain('style="--ld-size:20px"');
    expect(html).not.toContain("--ld-duration:");
    expect(html).not.toContain("--ld-play-state:");
    expect(html).toContain("currentColor");
  });

  it("applies explicit appearance and motion props to the root", () => {
    const html = renderToStaticMarkup(
      <Spinner
        className="custom-spinner"
        color="rebeccapurple"
        duration={1500}
        playState="paused"
        size={32}
      />
    );

    expect(html).toContain(`class="ld-${name} custom-spinner"`);
    expect(html).toContain(
      'style="--ld-size:32px;color:rebeccapurple;--ld-duration:1500ms;--ld-play-state:paused"'
    );
  });

  it("preserves explicitly supplied zero values", () => {
    const html = renderToStaticMarkup(<Spinner duration={0} size={0} />);

    expect(html).toContain('style="--ld-size:0px;--ld-duration:0ms"');
  });

  it("ships inheritable motion CSS and a reduced-motion fallback", () => {
    const html = renderToStaticMarkup(<Spinner />);

    expect(html).toContain("var(--ld-duration,");
    expect(html).toContain("var(--ld-play-state, running)");
    expect(html).toContain("@media (prefers-reduced-motion: reduce)");
    expect(html).toContain("animation: none;");
  });

  it("emits one stylesheet when multiple instances render together", () => {
    const html = renderToStaticMarkup(
      <>
        <Spinner />
        <Spinner size={40} />
      </>
    );

    expect(html.split("<style ")).toHaveLength(2);
    expect(html).toContain(`data-href="ld-${name}"`);
    expect(html.split(`class="ld-${name}"`)).toHaveLength(3);
  });
});
