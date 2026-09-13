# loading-dev

Loading, made beautiful. A small library of loading indicators for React.

```sh
npm install loading-dev
```

```tsx
import { Arc } from "loading-dev";

<Arc size={16} />
```

You can set `size`, `color`, `duration` and `easing`. The library exposes `playState` and also allows you to add custom styling. They work in Server Components and respect reduced motion out of the box. Requires React 19 or later.

Available: `Arc`, `BouncingDots`, `CircularDots`, `Classic`, `ClassicV2`, `Clock`, `Comet`, `Compass`, `Drive`, `Grid`, `LinearDots`, `Orbit`, `Pulse`, `Radar`, `Ring`, `Ripple`, `Swirl`.

You can find docs and live previews at [loading.dev](https://loading.dev).

## Development

The library itself is at the root and the website is in `apps/web`. `pnpm dev` runs both.

## Credits

Made by [Jakub](https://x.com/jakubkrehel) and [Paul](https://x.com/paulfaivret).

## License

MIT
