# loading-dev

Loading, made beautiful. A small and lightweight library full of beautiful loading indicators.

## Install

```sh
npm install loading-dev
```

Requires React 19 or later.

## Usage

Import any spinner and place it where you want to show a loading state:

```tsx
import { Arc } from "loading-dev";

export function SubmitButton() {
  return (
    <button disabled type="submit">
      <Arc size={16} />
      Saving…
    </button>
  );
}
```

Spinners use the surrounding text color by default. Use `size` and `color` to change how they look, or `duration` to change how fast they move:

```tsx
<Arc size={24} color="royalblue" duration={1000} />
```

`size` is in pixels. `duration` is the time for one animation cycle, in milliseconds. `playState=` exposes the state of the spinner.

All spinners work in Server Components and they follow reduced motion preference out of the box.

## Spinners

- `Arc`
- `BouncingDots`
- `CircularDots`
- `Classic`
- `Clock`
- `Comet`
- `Compass`
- `Drive`
- `Grid`
- `LinearDots`
- `Orbit`
- `Pulse`
- `Radar`
- `Ring`
- `Ripple`
- `Swirl`

## Documentation

[loading.dev](https://loading.dev).

## License

MIT
