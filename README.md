# loading-dev

Loading, made beautiful. A small library of loading indicators for React.

```sh
npm install loading-dev
```

```tsx
import { Arc } from "loading-dev";

<Arc size={16} />
```

You can set `size`, `color` and `duration`, plus `easing` on the rotating spinners, `cap` on the stroked ones and a prop of its own on a few others. The library exposes `playState` and also allows you to add custom styling. They work in Server Components and respect reduced motion out of the box. Requires React 19 or later.

Available: `Arc`, `Atom`, `Blocks`, `BouncingDots`, `Cascade`, `CircularDots`, `Classic`, `ClassicV2`, `Clock`, `Comet`, `Compass`, `Dual`, `Eclipse`, `Flip`, `Gather`, `Leap`, `LinearDots`, `Loading`, `Morph`, `Orbit`, `Pulse`, `Radar`, `Ring`, `Ripple`, `Slide`, `Snake`, `Swirl`, `Trace`, `Wave`.

You can find docs and live previews at [loading.dev](https://loading.dev).

## License

MIT
