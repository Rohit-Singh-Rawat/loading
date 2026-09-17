import { rotationCss, spinClass } from "./easing";
import { SpinnerStyle, spinnerRoot, step } from "./frame";
import { SIZE, STEP_VAR, stagger } from "./motion";
import type { SpinnerProps } from "./types";

const DOTS = Array.from({ length: 5 }, (_, index) => index);

// The dots sit a sixteenth of a cycle apart rather than spread around the
// whole turn, so they run as one train that stretches where it is fast and
// bunches where it is slow.
const SLOTS = 16;

const css = `
.ld-chase {
  position: relative;
  width: ${SIZE};
  height: ${SIZE};
}

${rotationCss("chase")}

.ld-chase-orbit {
  position: absolute;
  inset: 0;
  animation-delay: ${stagger("chase", SLOTS)};
}

.ld-chase-dot {
  position: absolute;
  top: 0;
  left: 40%;
  width: 20%;
  height: 20%;
  background: currentColor;
  border-radius: 50%;
}

@media (prefers-reduced-motion: reduce) {
  .ld-chase-orbit {
    transform: rotate(calc(var(${STEP_VAR}) * ${360 / DOTS.length}deg));
  }
}
`;

export function Chase(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="chase">{css}</SpinnerStyle>
      <div {...spinnerRoot("chase", props)}>
        {DOTS.map((index) => (
          <div
            className={`ld-chase-orbit ${spinClass("chase", "ease-in-out")}`}
            key={index}
            style={step(index)}
          >
            <div className="ld-chase-dot" />
          </div>
        ))}
      </div>
    </>
  );
}
