# loading

This is a monorepo for [loading.dev](https://loading.dev) website and the `loading-dev` package on npm.

- `packages/loading` — the published package. React 19, ESM only, zero dependencies, styles hoisted from inside the components so there is no CSS to import. Its own README documents the API.
- `apps/web` — the showcase and docs site.
- `examples/consumer` — installs `loading-dev` from the registry after a release and checks it actually works. It sits outside the workspace on purpose, so pnpm can't quietly symlink local source into the test.

```sh
pnpm dev     # tsup --watch and next dev, in parallel
pnpm lint    # Biome
```

Adding a spinner touches both packages — the library file, the motion contract, the site catalog, the snippet and its demos. The order is written out in `AGENTS.md`; `CONTEXT.md` explains the words (spinner, motion contract, catalog, document).
