# CONTEXT.md

The vocabulary this project uses for itself. Names here should be the names in
the code — if a term drifts, fix the code or fix this file.

## Spinner

One loading indicator: a React component in `packages/loading/src/<name>.tsx`,
its CSS, and its default motion. Decorative — every spinner is `aria-hidden`,
so whatever surrounds it is responsible for announcing that something is
loading.

Each spinner has an **`ld-` key** (`arc`, `bouncing-dots`, `ring`) that is its
identity inside the library: its root class name, its hoisted stylesheet's key,
and its key in the motion contract. All three are derived from it, so they
cannot disagree.

## Motion contract

Every spinner's motion is reachable two ways. The CSS custom properties
`--ld-duration`, `--ld-play-state` and `--spinner-size` cascade from any
ancestor, so one declaration can drive a whole subtree. The `size`, `duration`
and `playState` props set those same properties on a single spinner's root
element.

`spinnerRoot` in `frame.tsx` is where the two meet, and it writes a property
only when its prop is passed — an omitted prop leaves the property unset so an
ancestor's value still reaches the spinner. Precedence is prop, then ancestor,
then the spinner's own default.

`SPINNER_MOTION` in `packages/loading/src/motion.ts` is the machine-readable
half — each spinner's default duration, in milliseconds. It is the single
definition: the CSS interpolates its fallback from it, and the showcase seeds
the speed control from it rather than restating the number.

## Catalog

`CATALOG` in `apps/web/src/components/spinners/index.ts` — the showcase's list
of spinners and everything the site knows about each one that the library does
not: display name, description, and the speed slider's range. `SPINNER_ITEMS`
is derived from it, filling in each spinner's default duration from
`SPINNER_MOTION`.

An entry's `slug` is typed `SpinnerName`, so it is the same string as the
spinner's `ld-` key. It is also the MDX filename. One identifier, not three —
an entry cannot end up pointing at another spinner's motion.

**The array's order is the order everywhere**: the homepage grid, the sidebar,
and previous/next on a spinner page. Reordering it reorders all three.

The library owns motion; the catalog owns presentation. Descriptions, display
names and ordering are site copy and stay out of the published package.

## Customization

What the controls beside a preview change: size, colour, speed, opacity, and
playback. Owned by `SpinnerCustomizationProvider`, which is a provider rather
than a hook because the preview and the code snippet are separate subtrees
reading the same state.

The snippet tracks **size only**. Size has a fixed set of options, so every
snippet a reader can reach is highlighted on the server ahead of time and no
highlighter ships to the browser. Colour, speed and opacity are continuous and
deliberately do not appear in the snippet — they are preview-only controls.

"Reset" restores the customization controls. It deliberately does not touch
playback, which is a separate control outside the panel.

## Document

A spinner's MDX file in `apps/web/src/content/spinners/<slug>.mdx` — prose
only. Its filename is the spinner's slug, and its `##` headings become the
table of contents in the aside, slugged the same way `rehype-slug` slugs them.

The opening code example is **not** in the document; it is generated from the
live customization state.
