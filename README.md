# loading

The home of [loading.dev](https://loading.dev) and `loading-dev`, a collection of loading spinners for React.

- `packages/loading` contains the spinners published to npm. They use React 19, ship as ES modules, and have no dependencies. Styles are included, so there is no CSS file to import. See the [package README](packages/loading/README.md) for usage.
- `apps/web` is the website, where you can try each spinner and read the docs.
- `examples/consumer` is a small app for checking a release. It installs the package from npm and stays outside the workspace so it tests the published version instead of the local code.

To work on the project locally:

```sh
pnpm dev     # Start the website and watch for package changes
pnpm lint    # Check formatting and lint rules with Biome
```

To add a spinner, follow the steps in [AGENTS.md](AGENTS.md). They cover the component, its animation settings, and the examples and docs on the website. [CONTEXT.md](CONTEXT.md) explains how those pieces fit together.
