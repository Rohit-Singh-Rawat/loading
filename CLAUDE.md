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

Domain vocabulary lives in `CONTEXT.md` — read it before naming anything.

## Architecture

pnpm monorepo with two workspaces:

- **`packages/loading`** — the published npm package `loading-dev` ("Spinners. No more, no less."). React spinner components, ESM-only, built with tsup, React 19+ as a peer dependency.
- **`apps/web`** — Next.js 16 (App Router, Turbopack, React Compiler enabled) showcase/docs site that consumes `loading-dev` via `workspace:*`.

Plus one directory that is **not** a workspace member:

- **`examples/consumer`** — release-validation app that installs `loading-dev` from the npm registry. It sits outside the `apps/*` / `packages/*` globs on purpose: inside the workspace, pnpm would symlink the local package and the check would silently test local source instead of the published tarball. It has its own `package-lock.json`, is not covered by a root `pnpm install`, and is run manually (`cd examples/consumer && npm run verify`) after publishing. Never migrate it into the workspace, and never point `apps/web` at the registry version — the showcase must track local source so `pnpm dev` stays live.

### Library conventions (`packages/loading`)

Each spinner is one self-contained `.tsx` file:

- CSS lives inline in the component via React 19's style hoisting — no CSS files, no bundler CSS handling for consumers. Use `SpinnerStyle` from `frame.tsx` rather than writing the `<style>` tag; it derives the stylesheet key from the spinner's `ld-` key.
- Class names are prefixed `ld-` (e.g. `ld-arc`). `spinnerRoot()` in `frame.tsx` supplies the root element's shared attributes: `aria-hidden`, the merged class name, and `--spinner-size`.
- Every animation must have a `@media (prefers-reduced-motion: reduce)` fallback.
- Never write a duration or the 20px default as a literal. `duration(name)`, `SIZE` and `DEFAULT_SIZE` all come from `motion.ts`, which owns the contract; `frame.tsx` is only the React frame — see `CONTEXT.md` on the motion contract.
- All spinners take `SpinnerProps` from `types.ts`: `{ className?, size? }`, and use `currentColor` so they inherit text color.
- Export new spinners from `src/index.ts` (a barrel by design — Biome's `noBarrelFile` is disabled for package entry points).

### Adding a spinner (cross-package workflow)

1. Create `packages/loading/src/<name>.tsx` following the conventions above; export it from `src/index.ts`.
2. Add its default duration to `SPINNER_MOTION` in `packages/loading/src/motion.ts`. The key is the spinner's `ld-` key, and `SpinnerStyle`/`spinnerRoot` will not type-check without it.
3. Add a row to `packages/loading/README.md`.
4. Register it in `apps/web/src/components/spinners/index.ts` (`CATALOG`, which `SPINNER_ITEMS` is derived from). This drives the homepage, the sidebar, previous/next, and `generateStaticParams` — **array position is the display order**. `slug` is typed `SpinnerName`, so it must be the spinner's `ld-` key; the default speed is read from `SPINNER_MOTION` under that key, and the entry only supplies the slider's `max`/`min`. Every entry needs a `component`; the site has no placeholder state, so a spinner only appears once it is built.
5. Write `apps/web/src/content/spinners/<slug>.mdx` — prose only. The opening code example is generated from the live preview state, not written here. A missing file is a build error.
6. Add it to `SPINNERS` in `examples/consumer/app/page.tsx`, or the post-publish check will not cover it.

### Web app conventions (`apps/web`)

- Tailwind CSS v4, CSS-first config: semantic colour tokens (`--color-content`, `--color-background`, `--color-surface`, `--color-popover`, `--color-border`, `--color-orange`, and their `-subtle`/`-hovered` variants), shadows and fonts are defined in `src/styles/globals.css`; dark mode is via `prefers-color-scheme`, not a class toggle. Additional styles are split into `src/styles/{components,utilities}.css`.
- React Compiler handles memoization — do not add `useCallback`/`useMemo` for that purpose (Biome's `noJsxPropsBind` is intentionally off for this reason).
- Class merging uses `cn` from `src/lib/utils.ts` (clsx + tailwind-merge).
- Fonts are local woff2 files in `src/app/fonts/`, wired through `src/app/fonts.ts` and applied as CSS variables in the root layout.
- `next.config.ts` sets `turbopack.root` to the monorepo root — path assumptions depend on this.

## Linting

Biome extends the `ultracite` presets (`ultracite/biome/core` + `ultracite/biome/next`). Rule deviations are documented with comments in `biome.jsonc` — keep that pattern when disabling a rule.
