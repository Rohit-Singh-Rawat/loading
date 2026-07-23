# Folder Structure

## Ideal End State

Features are self-contained directories. Everything a feature needs lives in the same directory tree. You should never need to look outside a feature's folder to understand it.

```
feature/
  ├─ page.tsx              # Route entry point (thin: renders layout + children)
  ├─ layout.tsx            # If needed for nested layouts
  ├─ loading.tsx           # Suspense fallback at route level
  ├─ _components/
  │    ├─ feature-list.tsx       # ~80-120 lines
  │    ├─ feature-detail.tsx     # ~80-120 lines
  │    ├─ feature-row.tsx        # ~30-60 lines
  │    └─ feature-empty.tsx      # ~20-40 lines
  ├─ lib/
  │    ├─ use-feature-data.ts    # Data hook
  │    ├─ use-feature-filters.ts # URL state via nuqs
  │    └─ feature-utils.ts       # Pure functions
  └─ _private/                   # Internal components not used outside
       └─ feature-chart.tsx
```

### File Size Budget

| File type | Target | Max |
|-----------|--------|-----|
| Page/layout | 10-30 lines | 50 lines |
| Component | 50-120 lines | 150 lines |
| Hook | 20-60 lines | 100 lines |
| Utility | 10-40 lines | 80 lines |

If a file exceeds its max, split it.

## Patterns

### Route Groups for Layout Differentiation

```
[slug]/
  ├─ (views)/          # Standard sidebar shell layout
  │    └─ ...
  ├─ (editor)/         # Full-canvas layout (no sidebar)
  │    └─ feature/[id]/
  │         ├─ page.tsx
  │         ├─ layout.tsx
  │         ├─ loading.tsx
  │         ├─ _components/
  │         └─ _data/
  ├─ conversations/
  │    ├─ page.tsx
  │    ├─ _components/
  │    ├─ data/
  │    │    ├─ list.ts
  │    │    ├─ detail.ts
  │    │    └─ store.tsx
  │    └─ filters/
  │         ├─ search-filter.ts
  │         ├─ tab-filter.ts
  │         └─ advanced-filter.ts
  └─ settings/
       └─ team/
            └─ _components/
```

**Key patterns:**

1. **`_components/` and `_data/` prefixes** — Next.js won't treat these as routes.
2. **`data/` directory** — All data hooks, stores, and fetching logic co-located.
3. **`filters/` directory** — URL state hooks separated from data hooks.
4. **Route groups `(views)` / `(editor)`** — Different layouts for different interaction modes.
5. **Pages are thin.** `page.tsx` files are 5-25 lines.

### Thin Pages

```tsx
// page.tsx (6 lines)
import { Canvas } from "./_components/canvas/canvas";

export default function Page() {
  return <Canvas />;
}
```

```tsx
// feature/page.tsx (15 lines)
export default async function FeaturePage({ params }) {
  const { slug } = await params;
  const promise = getData({ slug });

  return (
    <FeatureProvider value={{ promise }}>
      <FeatureContainer>
        <FeatureList />
        <FeatureDetail />
      </FeatureContainer>
    </FeatureProvider>
  );
}
```

## Antipatterns

### Excessive Nesting

Double-parenthesized route groups that add levels with no semantic meaning. Route groups should only exist when they provide a different layout.

### `desktop/` and `mobile/` Parallel Directories

Desktop and mobile versions share 90% of their logic. Use one component per feature with a responsive wrapper.

```
members/components/
  ├─ invite-member-form.tsx       # The actual form (shared)
  ├─ invite-member-trigger.tsx    # Responsive dialog/sheet wrapper
  ├─ members-list.tsx             # Responsive list
  └─ member-detail.tsx            # Responsive detail view
```

### `shared/` Directories That Aren't Shared

"Shared" implies cross-feature usage. When there's only one consumer, remove `shared/` and put components directly in `_components/`.

### God Files With Multiple Exports

A single file exports 7+ sub-components, 2+ hooks, and 4+ compositions.

**Fix:** Split by concern:

```
avatar-upload/
  ├─ avatar-upload.tsx            # Compound component
  ├─ use-avatar-upload.ts         # Upload mutation hook
  ├─ profile-avatar-upload.tsx    # Profile-specific composition
  └─ workspace-avatar-upload.tsx  # Workspace-specific composition
```

## Naming Conventions

| Convention | Example | Notes |
|-----------|---------|-------|
| kebab-case files | `surface-api-keys-tab.tsx` | Always. No PascalCase files. |
| Feature prefix for components | `problem-timeline.tsx` | Prevents name collisions |
| `use-` prefix for hooks | `use-session-detail.ts` | Standard React convention |
| `_` prefix for private dirs | `_components/`, `_data/` | Next.js ignores these as routes |
| No `index.ts` barrel files | Import from specific files | `import { X } from "./feature/x"` |

## Rules

1. **Features are self-contained.** All components, hooks, utils, and types live in the feature's directory tree.
2. **Pages are thin.** 10-30 lines. Compose providers and layout. No business logic.
3. **No `shared/` unless genuinely shared.** If a component has one consumer, co-locate it.
4. **No `desktop/` / `mobile/` parallel trees.** Use responsive wrappers.
5. **Route groups only for layout changes.** Don't create route groups for organization.
6. **File <= 150 lines.** Split if larger.
7. **One primary export per file.** No barrel files.

## Tradeoffs

- **Next.js App Router forces some depth.** Auth layouts, org-scoping, and shell chrome add levels. Accept this but avoid unnecessary levels below it.
- **Some duplication between mobile/desktop is acceptable** when interaction models genuinely differ (swipe gestures). But share business logic and data fetching.
- **Co-location sometimes means small directories.** A feature with 2 components and 1 hook still gets its own directories. Consistency is worth the overhead.
