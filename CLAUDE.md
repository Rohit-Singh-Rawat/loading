# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the repo root (`pnpm@11.8.0` workspace):

- `pnpm dev` — runs all packages in parallel: `tsup --watch` for the library and `next dev` for the site
- `pnpm build` — builds everything; `apps/web` builds `loading-dev` first (`pnpm --filter loading-dev build && next build`)
- `pnpm lint` — Biome check (`biome check .`)
- `pnpm fix` — Biome check with autofix (`biome check --write .`)
- `pnpm format` — Biome format

There is no test suite.

## Architecture

pnpm monorepo with two workspaces:

- **`packages/loading`** — the published npm package `loading-dev` ("Spinners. No more, no less."). React spinner components, ESM-only, built with tsup, React 19+ as a peer dependency.
- **`apps/web`** — Next.js 16 (App Router, Turbopack, React Compiler enabled) showcase/docs site that consumes `loading-dev` via `workspace:*`.

Plus one directory that is **not** a workspace member:

- **`examples/consumer`** — release-validation app that installs `loading-dev` from the npm registry. It sits outside the `apps/*` / `packages/*` globs on purpose: inside the workspace, pnpm would symlink the local package and the check would silently test local source instead of the published tarball. It has its own `package-lock.json`, is not covered by a root `pnpm install`, and is run manually (`cd examples/consumer && npm run verify`) after publishing. Never migrate it into the workspace, and never point `apps/web` at the registry version — the showcase must track local source so `pnpm dev` stays live.

### Library conventions (`packages/loading`)

Each spinner is one self-contained `.tsx` file:

- CSS lives inline in the component via React 19's style hoisting: `<style href="ld-<name>" precedence="loading-dev">` — no CSS files, no bundler CSS handling for consumers.
- Class names are prefixed `ld-` (e.g. `ld-arc`), merged with the local `classNames` helper (not the web app's `cn`).
- Every animation must have a `@media (prefers-reduced-motion: reduce)` fallback.
- All spinners take `SpinnerProps` from `types.ts`: `{ className?, size? }` with `size` defaulting to 20, and use `currentColor` so they inherit text color.
- Export new spinners from `src/index.ts` (a barrel by design — Biome's `noBarrelFile` is disabled for package entry points).

### Adding a spinner (cross-package workflow)

1. Create `packages/loading/src/<name>.tsx` following the conventions above; export it from `src/index.ts`.
2. Register it in `apps/web/src/components/spinners/index.ts` (`SPINNER_ITEMS`). This registry drives the sidebar, the components index, and `generateStaticParams` for `/spinners/[slug]`. Every entry must have a `component` — the site has no placeholder/"coming soon" state, so a spinner only appears here once it is built.

### Web app conventions (`apps/web`)

- Tailwind CSS v4, CSS-first config: design tokens (custom gray scale `--color-gray-100`–`1200`, shadows, etc.) are defined in `src/styles/globals.css` under `@layer base`; dark mode is via `prefers-color-scheme`, not a class toggle. Additional styles are split into `src/styles/{components,enter-animation,utilities}.css`.
- React Compiler handles memoization — do not add `useCallback`/`useMemo` for that purpose (Biome's `noJsxPropsBind` is intentionally off for this reason).
- Class merging uses `cn` from `src/lib/utils.ts` (clsx + tailwind-merge).
- Fonts are local woff2 files in `src/app/fonts/`, wired through `src/app/fonts.ts` and applied as CSS variables in the root layout.
- `next.config.ts` sets `turbopack.root` to the monorepo root — path assumptions depend on this.

## Linting

Biome extends the `ultracite` presets (`ultracite/biome/core` + `ultracite/biome/next`). Rule deviations are documented with comments in `biome.jsonc` — keep that pattern when disabling a rule.
