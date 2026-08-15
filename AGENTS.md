# AGENTS.md

This file is the single source of guidance for coding agents working in this repository. `CLAUDE.md` imports it and adds nothing but Claude Code specifics, so put repository facts here and do not maintain a second copy.

Note that `apps/web/AGENTS.md` and `examples/consumer/AGENTS.md` exist but are not yours to write — they hold only the managed `nextjs-agent-rules` block that `next dev` generates and re-adds. Leave them alone.

## Working agreement

Behavioural rules, not code conventions. They come from recurring corrections in this repository's sessions — treat them as project rules.

- **Change only what was named.** If a fix needs an adjacent file, helper, dependency or piece of copy, say so and stop. Removing the last usage of a dependency is not permission to uninstall it. Never delete or rewrite authored content — spinner prose, comments — as a side effect of another task.
- **A passing check is not a working feature.** `pnpm lint` proves the code compiles; it says nothing about how a spinner actually looks or moves. For any visual or runtime change, state what was verified and what was never seen running as two separate things. If it wasn't looked at, the word is "unverified" — a green check does not stand in for it, and never run a check just so there is something green to report.
- **Don't run builds or checks on routine changes.** A styling tweak, a spinner tweak, an MDX copy edit does not need `pnpm build` or `pnpm lint` afterwards. They cost more time than they save, and the dev server and editor surface the same errors sooner. Make the change and say what you changed. `pnpm build` is the worst offender — it builds every workspace package. Run a check only when the change is broad, touches config, types, the motion contract or the package exports, or when asked — and say in one line what it is for before starting it. Never narrate a step you are about to take instead of taking it.
- **End on the result.** No "want me to…", "say the word", "happy to…". If a decision is genuinely needed, ask it in the first line, not the last. A caveat earns its place only when it changes what to do next.
- **Edit prose, don't hedge it.** In `apps/web/src/content/spinners/*.mdx` and `README` copy, preserve the author's voice and level of certainty. No added qualifiers, no both-sides caveats, no new "never" absolutes.
- **Answer at the altitude of the question.** Reach for the platform primitive — a Tailwind media query over a custom hook, CSS over JS. The general solution is for after the specific one has been shown to fail.
- **Write commit and PR titles like a person.** `type(scope): short summary`, under ~60 characters — this repo scopes by package (`web`, `spinners`, `loading`), as in `fix(web): drop the theme background from the live snippet` and `refactor(spinners): unify spinner catalog and customization logic`. No trailing "for improved / for better / for consistency" clause. One change per title; if it needs an "and", it is two commits. Name the outcome, don't restate the diff, and avoid the filler verbs `enhance`, `streamline`, `standardize`, `optimize`.
- **PR descriptions are plain prose or nothing.** A few sentences on what changed and why; a `## heading` only when there is a real bug or decision to explain. Never a bulleted dump of the commit subjects. Most changes here need no body at all — leave it empty rather than padding it.

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
- Class names are prefixed `ld-` (e.g. `ld-arc`). `spinnerRoot()` in `frame.tsx` supplies the root element's shared attributes: `aria-hidden`, the merged class name, and the CSS properties the appearance props set. It resolves the `size` default too, so a spinner destructures `size` only when its own markup needs the number — the SVG ones do, the rest just forward their props.
- Every animation must have a `@media (prefers-reduced-motion: reduce)` fallback.
- Never write a duration or the 20px default as a literal. `duration(name)`, `SIZE` and `DEFAULT_SIZE` all come from `motion.ts`, which owns the contract; `frame.tsx` is only the React frame — see `CONTEXT.md` on the motion contract.
- All spinners take `SpinnerProps` from `types.ts`: `{ className?, color?, duration?, playState?, size? }`, and use `currentColor` so they inherit text color when `color` is omitted. Every prop but `className` writes a CSS property in `spinnerRoot` and only when passed — see `CONTEXT.md` on the motion contract for why omission matters.
- Export new spinners from `src/index.ts` (a barrel by design — Biome's `noBarrelFile` is disabled for package entry points).

### Adding a spinner (cross-package workflow)

1. Create `packages/loading/src/<name>.tsx` following the conventions above; export it from `src/index.ts`.
2. Add its default duration to `SPINNER_MOTION` in `packages/loading/src/motion.ts`. The key is the spinner's `ld-` key, and `SpinnerStyle`/`spinnerRoot` will not type-check without it.
3. Add a row to `packages/loading/README.md`.
4. Register it in `apps/web/src/components/spinners/index.ts` (`CATALOG`, which `SPINNER_ITEMS` is derived from). This drives the homepage, the sidebar, previous/next, and `generateStaticParams` — **array position is the display order**. `slug` is typed `SpinnerName`, so it must be the spinner's `ld-` key; the default speed is read from `SPINNER_MOTION` under that key, and the entry only supplies the slider's `max`/`min`. Every entry needs a `component`; the site has no placeholder state, so a spinner only appears once it is built.
5. Write `apps/web/src/content/spinners/<slug>.mdx` — prose and a `<Demo name="<slug>/<demo>" />` tag per section. A missing file is a build error.
6. Write `apps/web/src/content/snippets/<slug>.mdx` — the opening code example above the prose, a single fenced block titled `<slug>.tsx`. It is static: the size control drives the preview, not this.
7. Add the demo files those `<Demo />` tags name, as a **pair** at `apps/web/src/content/demos/<slug>/<demo>.{tsx,mdx}` — the `.tsx` is the default-exported component that renders, the `.mdx` is one fenced block titled `<slug>.tsx` holding the same code, which is what the reader sees and what `/spinners/<slug>/markdown` splices in. Match the set the other spinners already have. The pair is written by hand and nothing checks the two agree, so change them together. Either file missing is a build error.
8. Add it to `SPINNERS` in `examples/consumer/app/page.tsx`, or the post-publish check will not cover it.

### Web app conventions (`apps/web`)

- Tailwind CSS v4, CSS-first config: semantic colour tokens (`--color-content`, `--color-background`, `--color-surface`, `--color-popover`, `--color-border`, `--color-orange`, and their `-subtle`/`-hovered` variants), shadows and fonts are defined in `src/styles/globals.css`; dark mode is via `prefers-color-scheme`, not a class toggle. Additional styles are split into `src/styles/{components,utilities}.css`.
- React Compiler handles memoization — do not add `useCallback`/`useMemo` for that purpose (Biome's `noJsxPropsBind` is intentionally off for this reason).
- Class merging uses `cn` from `src/lib/utils.ts` (clsx + tailwind-merge).
- Every code block on the site is a fenced block in an `.mdx` file, highlighted at build time by `rehype-pretty-code` and rendered through `src/components/mdx/`. This is the pattern in `~/Developer/jakub.kr` and `~/Developer/interfaces`; check those repos before adding web UI here. There is no programmatic highlighter — do not reach for `codeToHtml`/`codeToTokens`. A code sample that needs to sit beside a live example is an `.mdx` imported as a component, as `Demo` does.
- Fonts are local woff2 files in `src/app/fonts/`, wired through `src/app/fonts.ts` and applied as CSS variables in the root layout.
- `next.config.ts` sets `turbopack.root` to the monorepo root — path assumptions depend on this.

## Linting

Biome extends the `ultracite` presets (`ultracite/biome/core` + `ultracite/biome/next`). Rule deviations are documented with comments in `biome.jsonc` — keep that pattern when disabling a rule.
