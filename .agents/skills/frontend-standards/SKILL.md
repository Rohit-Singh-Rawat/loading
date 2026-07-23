---
name: frontend-standards
description: >-
  General React and Next.js frontend standards for component composition, data
  ownership, state management, forms, animations, code splitting, and folder
  structure. Applicable to any modern React project using common tools (nuqs,
  react-hook-form, motion/react, Radix, Zod).
version: 1.0.0
progressive_disclosure:
  entry_point:
    summary: "General frontend standards for React and Next.js projects"
    when_to_use: "When writing new frontend code, reviewing PRs, refactoring, or establishing patterns for a React/Next.js project"
    quick_start: "Read the Quick Reference section, then load the relevant topic file"
  references:
    - component-composition.md
    - data-ownership.md
    - state-management.md
    - form-patterns.md
    - animation-conventions.md
    - code-splitting.md
    - folder-structure.md
---

# Frontend Standards

General frontend standards for React and Next.js projects. These patterns are framework-tool agnostic where possible and apply to any modern React codebase using common libraries.

## When to Apply

Reference these standards when:
- Writing any new component, hook, or page
- Reviewing pull requests
- Refactoring existing code
- Establishing patterns for a new project

## Topics by Priority

| Priority | Category | Impact | File |
|----------|----------|--------|------|
| 1 | Component Composition | CRITICAL | [component-composition](./component-composition.md) |
| 2 | Data Ownership | CRITICAL | [data-ownership](./data-ownership.md) |
| 3 | State Management | HIGH | [state-management](./state-management.md) |
| 4 | Form Patterns | HIGH | [form-patterns](./form-patterns.md) |
| 5 | Code Splitting | MEDIUM | [code-splitting](./code-splitting.md) |
| 6 | Animation Conventions | MEDIUM | [animation-conventions](./animation-conventions.md) |
| 7 | Folder Structure | MEDIUM | [folder-structure](./folder-structure.md) |

## Quick Reference

### CRITICAL

- **Compound components for dialogs/sheets.** No `open`/`onOpenChange` prop drilling. Dialog owns its state via Radix internals.
- **Components own their data.** Subscribe via hooks. Parents pass IDs, not objects. Max 3 non-`children` props.
- **No manual memoization** (with React Compiler). No `useMemo`/`useCallback` for performance, no `React.memo`. Only for semantic stability.
- **URL is state.** Filters, selections, active items go in the URL via `nuqs`. Never `useState` for URL-worthy state.
- **Derive, don't sync.** Compute values during render. No `useEffect` + `useState` for derived state.
- **No manual frontend types.** Infer types from your data layer, Zod schemas, or hook return types. Never hand-write `interface` for backend data.

### HIGH

- **`useForm` + `zodResolver` for forms.** No manual `useState` for form fields.
- **Lazy-load heavy deps.** Charts, editors, syntax highlighters behind `lazy()` or `next/dynamic`. Dialogs: lazy content, eager trigger.
- **Error boundaries** at feature boundaries.

### MEDIUM

- **Comments explain _why_, not _what_.** No decorative separators, no section labels, no comments that restate the code.
- **Design system primitives over raw HTML.** Use your component library's `<Text>`, `<Button>`, etc.
- **No `switch` statements.** Use typed handler maps keyed by a discriminant (`Record<Type, Handler>`).
- **Files <= 150 lines.** One primary export per file. No barrel files.
- **50-150 line components.** `children` over render props. Domain objects as props, not destructured fields.

### LOW

- **Animations:** blur + y-offset + spring convention. `LazyMotion` at root. Module-level constants for variants.
- **Only animate S-tier properties.** `transform`, `opacity`, `filter`, `clip-path`. Use `layout` for size/position.

## Guiding Principles

1. **Components are leaves, not trees.** 50-150 lines. Composition via `children`.
2. **Data flows through hooks, not props.** Components subscribe to what they need.
3. **The URL is state.** Anything the user expects to survive refresh.
4. **No manual types.** Find the source of truth and infer.
5. **Composition over configuration.** Compound components over prop-heavy wrappers.
6. **Derive, don't sync.** If you can compute it, don't store it.
7. **Fail loudly.** Throw on missing config. Throw on precondition failure. Never silently return success.
