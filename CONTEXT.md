# CONTEXT.md

The vocabulary this project uses for itself. Names here should be the names in
the code — if a term drifts, fix the code or fix this file.

## Spinner

One loading indicator: a React component in `src/<name>.tsx`,
its CSS, and its default motion. Decorative — every spinner is `aria-hidden`,
so whatever surrounds it is responsible for announcing that something is
loading.

Each spinner has an **`ld-` key** (`arc`, `bouncing-dots`, `ring`) that is its
identity inside the library: its root class name, its hoisted stylesheet's key,
and its key in the motion contract. All three are derived from it, so they
cannot disagree.

## Motion contract

Every spinner's motion is reachable two ways. The CSS custom properties
`--ld-duration` and `--ld-play-state` cascade from any ancestor, so one
declaration can drive a whole subtree. The `duration` and `playState` props set
those same properties on a single spinner's root element.

`spinnerRoot` in `frame.tsx` is where the two meet, and it writes a property
only when its prop is passed — an omitted prop leaves the property unset so an
ancestor's value still reaches the spinner. Precedence is prop, then ancestor,
then the spinner's own default. `color` rides the same rule through the plain
CSS `color` property, which the spinners paint with via `currentColor`.

`--ld-size` is not part of that: `spinnerRoot` always writes it, resolving
the `size` prop against the package default. It carries the number into the
spinner's own CSS rather than offering a second way in, so size is a prop and
nothing else.

`SPINNER_MOTION` in `src/motion.ts` is the machine-readable
half — each spinner's default duration, in milliseconds. It is the single
definition: the CSS interpolates its fallback from it, and the showcase seeds
the speed control from it rather than restating the number.

## Catalog

`CATALOG` in `apps/web/src/components/spinners/index.ts` — the showcase's list
of spinners and everything the site knows about each one that the library does
not: display name, description, its `href`, and the speed slider's range. It is exported
as `SPINNER_ITEMS`. Preview customization reads the default duration directly
from `SPINNER_MOTION`, and option defaults come from the library too.

An entry's `slug` is typed `SpinnerName`, so it is the same string as the
spinner's `ld-` key. It is also the MDX filename. One identifier, not three —
an entry cannot end up pointing at another spinner's motion.

**The array's order is the order everywhere**: the homepage grid, the sidebar,
and previous/next on a spinner page. Reordering it reorders all three.

An entry's **options** are the props a spinner has beyond the shared ones —
`easing` on the rotating spinners. Each names the prop,
the label the control shows, its values in control order, and an explicit
`defaultValue` from the library. The catalog only describes the choice; the prop itself
lives in the library.

`SPINNERS` in `src/spinners.ts` is the library's registry:
every spinner under its `ld-` key. The showcase and motion tests render from it;
the export tests and consumer check also cover the public named imports.
The catalog checks an entry's options against
the component registered under its slug through a type-only import. An option's
value list is a nonempty tuple; its order does not determine the default.

The library owns motion; the catalog owns presentation. Descriptions, display
names and ordering are site copy and stay out of the published package.

## Customization

What the controls beside a preview change: size, colour, speed, opacity, and
playback. Owned by `CustomizationProvider`, which wraps the preview and the
opening snippet; `SpinnerPreview` reads it and passes the controls to its
`CustomizePanel` child.

The opening snippet follows the customization: it shows the props a consumer
would write to get what the preview shows, and nothing still at its default.
Opacity is a preview-only control and stays out of it. The snippet's block is
still highlighted at build time — the live snippet borrows one colour per
token kind from it, so no highlighter ships to the browser.

Option state contains only explicit overrides. Unchanged options are omitted
from the preview props, so the library owns their default behavior.

"Reset" restores the customization controls. It deliberately does not touch
playback, which is a separate control outside the panel and, being a way of
looking rather than a customization, never reaches the snippet.

## Document

The prose every spinner page shares, in
`apps/web/src/content/spinners/_shared.mdx` — one file, with a `##` heading and
a `<Demo />` tag per section. What makes a spinner distinct is its description
in the catalog and its demos. An option is documented once, in `content/options/<prop>.mdx` — one section
per prop, keyed by the option's `prop` name and rendered after the shared
ones by every spinner whose catalog entry lists it. The `##` headings of both
become the table of contents in the aside, slugged the same way `rehype-slug`
slugs them. The document helper expects plain `##` headings and literal
`<Demo name="demo-name" />` tags, matching the authored content.

A demo is `content/demos/<slug>/<demo>.tsx`, and it is the single source. Its
`.mdx` twin is a one-line fence that pulls the file in at build time, so the
code the reader sees is the code that renders.

The opening code example is **not** in the document. It is its own file,
`content/snippets/<slug>.mdx`. The file is the default state: on the page the
customization controls rewrite it, and the markdown route serves it as written.

`/spinners/<slug>/markdown` serves the document as plain Markdown for anything
reading rather than browsing. It is assembled, not served verbatim: the
snippet goes above the prose the way it sits on the page, and each `<Demo />`
tag is replaced by a fenced block holding the demo's `.tsx`, so the reader gets
the code the tag would have rendered.
