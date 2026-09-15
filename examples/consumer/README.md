# consumer-example

A throwaway Next.js app that installs `loading-dev` **from the npm registry** to verify a
published release actually works for real consumers.

This is not part of the showcase site. `apps/web` deliberately stays on `workspace:*` so
library edits appear instantly during `pnpm dev`; this app deliberately does the opposite.

## Why it lives outside the pnpm workspace

`pnpm-workspace.yaml` lists only the root and `apps/*`. Keeping this app at `examples/`
means pnpm cannot symlink the local library into it, so `node_modules/loading-dev`
is a genuine registry download. If this app were added to the workspace, the test would
silently start passing against local source and stop being a test at all.

The trade-off: it has its own `package-lock.json` and is not covered by a root `pnpm install`.
That is intentional. A clean install is the thing being verified.

## Usage

```sh
cd examples/consumer
npm install        # first time only
npm run verify     # pull the newest published version and type-check + build against it
npm run dev        # inspect the spinners at http://localhost:3001
```

`npm run verify` is the one to run after every publish.

## What a passing build proves

- The package installs from the registry with no peer-dependency conflicts
- The `exports` map resolves under `moduleResolution: "bundler"`
- Every spinner has a public named export with types in `dist/index.d.ts`
  (the explicit named imports in `app/page.tsx` fail the build otherwise)
- Components render in a **Server Component** with no `"use client"` boundary
- React 19 style hoisting emits the `<style data-precedence="loading-dev">` tags server-side

## What it does not prove

Motion and `prefers-reduced-motion` fallbacks ship as CSS text but are never executed by a
build. Check those by eye with `npm run dev` and your OS "Reduce motion" setting toggled.
