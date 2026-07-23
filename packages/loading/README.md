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

| Component      | Description                                    |
| -------------- | ---------------------------------------------- |
| `Arc`          | A rotating arc stroke                          |
| `Classic`      | The classic 12-bar spinner                     |
| `Ring`         | A rotating arc over a faint track ring         |
| `BouncingDots` | Three dots bouncing with a stagger             |

## Props

Every spinner accepts the same props:

| Prop        | Type     | Default | Description                              |
| ----------- | -------- | ------- | ---------------------------------------- |
| `size`      | `number` | `20`    | Width and height in pixels               |
| `className` | `string` | —       | Extra class names for the root element   |

All spinners respect `prefers-reduced-motion` and render a static fallback when it is set.

## License

MIT
