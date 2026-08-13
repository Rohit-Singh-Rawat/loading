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

The part of a spinner's interface that is not props: the CSS custom properties
`--ld-duration` and `--ld-play-state`, which cascade from any ancestor, plus
`--spinner-size`, which the `size` prop sets.

`SPINNER_MOTION` in `packages/loading/src/motion.ts` is the machine-readable
half — each spinner's default duration, in milliseconds. It is the single
definition: the CSS interpolates its fallback from it, and the showcase seeds
the speed control from it rather than restating the number.

## Catalog

`SPINNER_ITEMS` in `apps/web/src/components/spinners/index.ts` — the showcase's
list of spinners and everything the site knows about each one that the library
does not: slug, display name, description, and which controls the preview
offers.

**The array's order is the order everywhere**: the homepage grid, the sidebar,
and previous/next on a spinner page. Reordering it reorders all three.

The library owns motion; the catalog owns presentation. Slugs, descriptions and
ordering are site copy and stay out of the published package.

## Customization

What the controls beside a preview change: size, colour, speed, opacity, and
playback. Owned by `SpinnerCustomizationProvider`, which is a provider rather
than a hook because the preview and the code snippet are separate subtrees
reading the same state — that is what keeps the snippet honest about what is
on screen.

"Reset" restores the customization controls. It deliberately does not touch
playback, which is a separate control outside the panel.

## Document

A spinner's MDX file in `apps/web/src/content/spinners/<slug>.mdx` — prose
only. Its filename is the spinner's slug, and its `##` headings become the
table of contents in the aside, slugged the same way `rehype-slug` slugs them.

The opening code example is **not** in the document; it is generated from the
live customization state.
