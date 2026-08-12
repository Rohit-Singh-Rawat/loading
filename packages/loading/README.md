# loading-dev

Spinners. No more, no less.

A small collection of loading indicators for React. Zero dependencies, zero configuration — styles ship inside the components via React 19 hoisted `<style>` tags, so there is no CSS file to import. Works in Server Components.

## Install

```sh
npm install loading-dev
```

Requires React 19 or later.

## Usage

```tsx
import { Arc, BouncingDots, Classic, Ring } from "loading-dev";

export function SubmitButton() {
  return (
    <button disabled type="submit">
      <Arc size={16} />
      Saving…
    </button>
  );
}
```

Spinners inherit their color from `currentColor` — set `color` on a parent (or via `className`) to tint them.

## Components

| Component      | Description                                     |
| -------------- | ----------------------------------------------- |
| `Arc`          | A rotating arc stroke                           |
| `BouncingDots` | Three dots bouncing with a stagger              |
| `Classic`      | The classic 12-bar spinner                      |
| `Comet`        | A full ring fading into a bright leading head   |
| `Grid`         | A four-by-four pixel grid lit row by row        |
| `Orbit`        | A fading half-arc circling a fixed center dot   |
| `Ring`         | A rotating arc over a faint track ring          |
| `Ripple`       | A pixel grid pulsing outward from its center    |

## Props

Every spinner accepts the same props:

| Prop        | Type     | Default | Description                              |
| ----------- | -------- | ------- | ---------------------------------------- |
| `size`      | `number` | `20`    | Width and height in pixels               |
| `className` | `string` | —       | Extra class names for the root element   |

## Motion

Animation is controlled with CSS custom properties rather than props, so you
can set them on any ancestor and let them cascade:

| Property           | Values                       | Description                    |
| ------------------ | ---------------------------- | ------------------------------ |
| `--ld-duration`    | any CSS time                 | Animation duration             |
| `--ld-play-state`  | `running` (default), `paused`| Pauses or resumes the animation|

```tsx
<div style={{ "--ld-duration": "2s" }}>
  <Arc />
</div>
```

Each spinner's default duration is also exported as data, so a control can be
seeded from the same value the CSS uses:

```ts
import { SPINNER_MOTION } from "loading-dev";

SPINNER_MOTION.arc.duration; // 800 (ms)
```

All spinners respect `prefers-reduced-motion` and render a static fallback when it is set.

## License

MIT
