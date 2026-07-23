# Animation Conventions

## Ideal End State

Animations are consistent across the app. A small set of shared presets cover 90% of use cases. Heavy animation dependencies are lazily loaded. All animations target 60fps minimum.

## Core Convention: Blur + Y-Offset + Spring

The standard enter/exit animation:

```ts
const transition = { type: "spring", duration: 0.4, bounce: 0 };

// Enter
{ opacity: 1, filter: "blur(0px)", y: 0 }

// Exit
{ opacity: 0, filter: "blur(5-8px)", y: -16 }

// Initial (enter from below)
{ opacity: 0, filter: "blur(5-8px)", y: 16 }
```

This pattern works for:
- Step transitions (onboarding wizard, auth flow)
- Page-level route transitions
- Popover/dropdown enter/exit
- List item enter/exit

### With `AnimatePresence`

```tsx
<AnimatePresence initial={false} mode="popLayout">
  <m.div
    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
    exit={{ opacity: 0, filter: "blur(5px)", y: -16 }}
    initial={{ opacity: 0, filter: "blur(5px)", y: 16 }}
    key={activeStepId}
    transition={{ type: "spring", duration: 0.4, bounce: 0 }}
  >
    {children}
  </m.div>
</AnimatePresence>
```

## Motion for React: Import Rules

Never import from `framer-motion`. The package is now Motion for React:

```ts
// Client components
import { motion, m, animate, AnimatePresence } from "motion/react";

// Server components
import * as motion from "motion/react-client";

// Non-React files (utilities, tests)
import { animate } from "motion";
```

## `LazyMotion` at Root

Motion features are lazily loaded once at the provider level:

```tsx
<LazyMotion features={domAnimation}>
  {children}
</LazyMotion>
```

Use `m.div`, `m.li`, etc. within the `LazyMotion` boundary. Only use `motion.div` when you need the full feature set (rare).

## Module-Level Constants for Variants

Define variants and transitions outside the component body:

```ts
const variants: Variants = {
  active: { backgroundColor: "var(--color-active)", color: "var(--color-active-text)" },
  hover: { backgroundColor: "var(--sand-3)", color: "var(--sand-12)" },
  idle: { backgroundColor: "var(--color-default)", color: "var(--sand-11)" },
};

const transition: Transition = { duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] };
```

**Incorrect:** Inline objects create new references every render:

```tsx
<motion.div
  animate={{ backgroundColor: isActive ? "var(--color-active)" : "var(--color-default)" }}
  transition={{ duration: 0.15 }}
>
```

## Performance Tiers

Target 60fps minimum (120fps ideal).

### S-Tier: Hardware Accelerated (always prefer)

Runs on compositor thread. Animate ONLY:
- `transform` (translate, rotate, scale) — prefer independent transforms (`x`, `y`, `scale`)
- `opacity`
- `filter` (blur <= 20px, ideally <= 10px)
- `clip-path`

### B-Tier: FLIP Technique

For size/position changes, use Motion's `layout` prop — never animate `width`, `height`, `top`, `left` directly:

```tsx
// Correct: FLIP technique
<motion.div layout>
  {expanded && <Content />}
</motion.div>

// Incorrect: layout properties animated directly
<motion.div animate={{ width: expanded ? 500 : 100 }} />
```

### Never Animate

- `width`, `height`, `top`, `left`, `margin`, `padding`, `flex`, `grid-*`, `display` — use `layout` instead
- Global CSS variables (`:root`/`html`) — invalidates entire tree
- Blur > 20px — GPU memory explosion

### `will-change` Guidelines

Only on elements that are actually animated. Accepted values: `transform`, `opacity`, `filter`, `clip-path`.

## Easing Reference

| Use case | Easing | Cubic bezier |
|----------|--------|-------------|
| Elements entering screen | ease-out-quad | `cubic-bezier(.25, .46, .45, .94)` |
| Elements entering (snappy) | ease-out-quint | `cubic-bezier(.23, 1, .32, 1)` |
| Elements moving within screen | ease-in-out-cubic | `cubic-bezier(.645, .045, .355, 1)` |
| Simple hover transitions | CSS `ease` | 200ms duration |

- Default to `ease-out` for most animations
- Animations should never exceed 1s (most should be 0.2-0.3s)
- Springs: always `bounce: 0` — springs for easing curve, not elasticity

### Hover Transitions

CSS `ease` with 200ms for simple hovers. Disable on touch devices:

```css
@media (hover: hover) and (pointer: fine) {
  .element { transition: color 200ms ease; }
}
```

## Imperative `animate()` for Numbers

For animating numeric values (counts, percentages), avoid per-frame re-renders:

```tsx
const countUp = animate(0, value, {
  duration: 2.2,
  ease: [0.25, 0.1, 0.25, 1],
  onUpdate(v) { node.textContent = format(v); },
  onComplete() { animate(node, { scale: [1, 1.04, 1] }, { duration: 0.3 }); },
});
```

## MotionValue Patterns

- Never read from a `MotionValue` in render — only in effects/callbacks
- Use `value.on("change", update)` — never `value.onChange(update)` (deprecated)
- Prefer composing chains of `useTransform`, `useSpring`, `useMotionValue`, `useVelocity`
- `useTransform`: prefer range mapping `useTransform(value, inputRange, outputRange)`

## Radix Integration

When adding animations to Radix components:
1. Set `asChild` on the Radix component, provide a `motion` element as the first child
2. For exit/layout animations, hoist Radix state into `useState`, conditionally render with `AnimatePresence`
3. Set `forceMount` on the Radix component that's conditionally rendered — only on Radix components, never on DOM elements

## Animation Frame Performance

Inside hot-path functions (`useTransform` callbacks, `onUpdate`):
- Avoid object allocation, prefer mutation
- Prefer `for` loops over `forEach`/`map`
- Avoid `Object.entries`, `Object.values`
- Coerce numbers/strings in as few steps as possible

Outside hot paths, use normal coding style.

## DOM Thrashing Prevention

Use Motion's `frame` API to batch reads and writes:

```tsx
import { frame } from "motion/react";

frame.read(() => {
  const width = element.offsetWidth;
  frame.update(() => {
    element.style.width = width * 2 + "px";
  });
});
```

Never interleave DOM reads and writes in a loop.

## Accessibility

Disable `transform` animations in the `prefers-reduced-motion` media query.

## Origin-Aware Animations

Elements should animate from the trigger. Set `transform-origin` accordingly.

## Rules

1. **Blur + y-offset + spring for enter/exit.** Standard convention for consistency.
2. **Never import from `framer-motion`.** Always `motion/react` for client, `motion/react-client` for server.
3. **`LazyMotion` at root, `m.*` components inside.**
4. **Module-level constants for variants and transitions.** Never inline animation objects in JSX.
5. **`bounce: 0` on springs.** Springs for easing curve, not elasticity.
6. **Only animate S-tier properties.** `transform`, `opacity`, `filter` (<=20px blur), `clip-path`. Use `layout` for size/position.
7. **Never animate global CSS variables.** Invalidates entire tree.
8. **`will-change` sparingly.** Only on elements that are actually animated.
9. **Disable transform animations for `prefers-reduced-motion`.**
10. **Never read MotionValues in render.** Only in effects/callbacks.
11. **`AnimatePresence` with `mode="popLayout"` for step transitions.**
