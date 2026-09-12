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

Spinners paint with `currentColor`, so they inherit the surrounding text color.
Pass the `color` prop to tint one, or set `color` on a parent to tint every
spinner underneath.

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

| Prop        | Type                     | Default | Description                            |
| ----------- | ------------------------ | ------- | -------------------------------------- |
| `size`      | `number`                 | `20`    | Width and height in pixels             |
| `color`     | `string`                 | —       | Any CSS color                          |
| `duration`  | `number`                 | —       | One animation cycle, in milliseconds   |
| `playState` | `"running" \| "paused"`  | —       | Whether the animation runs             |
| `className` | `string`                 | —       | Extra class names for the root element |

A few spinners take one more:

| Prop        | Spinners                          | Type                                       | Default    | Description                            |
| ----------- | --------------------------------- | ------------------------------------------ | ---------- | -------------------------------------- |
| `easing`    | `Arc`, `Comet`, `Orbit`, `Ring`   | `"linear" \| "ease-in-out" \| "stacked"` | `"linear"` | How the spinner travels around its circle |
| `direction` | `Grid`                            | `"rows" \| "columns" \| "diagonal"`      | `"rows"`   | Which way the lit cells sweep          |

For `easing`, `linear` keeps a constant speed, `ease-in-out` surges through
each turn and pauses at its end, and `stacked` layers the two — one linear
rotation under one eased — so the spinner surges without ever coming to rest.
For `direction`, `rows` sweeps top to bottom, `columns` left to right, and
`diagonal` from the top-left corner down.

```tsx
<Ring easing="stacked" />
<Grid direction="diagonal" />
```

## Motion

`duration` and `playState` set one spinner. The same values are also CSS custom
properties, so you can set them on any ancestor and let them cascade to every
spinner underneath:

| Property           | Values                       | Description                    |
| ------------------ | ---------------------------- | ------------------------------ |
| `--ld-duration`    | any CSS time                 | Animation duration             |
| `--ld-play-state`  | `running` (default), `paused`| Pauses or resumes the animation|

```tsx
<Arc duration={2000} />

<div style={{ "--ld-duration": "2s" }}>
  <Arc />
  <Ring />
</div>
```

A prop wins over an inherited property, which wins over the spinner's own
default.

Each spinner's default duration is also exported as data, so a control can be
seeded from the same value the CSS uses:

```ts
import { SPINNER_MOTION } from "loading-dev";

SPINNER_MOTION.arc.duration; // 800 (ms)
```

All spinners respect `prefers-reduced-motion` and render a static fallback when it is set.

## License

MIT
