# Code Splitting

## Ideal End State

Every route loads only the code it needs. Heavy dependencies are lazily imported. The critical path for any page is: shell chrome + page skeleton + data subscription. Everything else streams in.

```
Initial load:
  ├─ Shell layout (sidebar, header)          <- shared chunk
  ├─ Page skeleton (loading states)          <- route chunk
  └─ Data subscription (hooks)               <- route chunk

Deferred:
  ├─ Charts (recharts, d3)                   <- lazy import
  ├─ Rich editors (codemirror, shiki)        <- lazy import
  ├─ Dialogs/sheets (content only)           <- lazy via Suspense
  ├─ Heavy animations (motion variants)      <- lazy import
  └─ Third-party integrations (Stripe, etc.) <- lazy import
```

## Patterns

### Route Groups as Code Split Boundaries

Separate route groups for different interaction modes. A heavy canvas editor only loads when navigating to its specific route:

```tsx
// page.tsx — the entire editor is behind this route boundary
import { Canvas } from "./_components/canvas/canvas";

export default function Page() {
  return <Canvas />;
}
```

The editor's dependencies only enter the bundle when this route is visited.

### Parallel Data Fetching in Layouts

Server component layouts fetch data in parallel:

```tsx
const [entities, flow] = await Promise.all([
  getWorkflowEntities(params),
  getWorkflow(params),
]);
```

### Suspense Boundaries at Feature Boundaries

```tsx
<main className="relative flex min-h-0 w-full flex-1 justify-center">
  <Suspense fallback={<ImmediateSpinner />}>
    <FeatureDetail />
  </Suspense>
  <FeatureSidebar />
</main>
```

The detail streams in while the sidebar renders immediately.

### `loading.tsx` for Route-Level Suspense

Every route with async data has a `loading.tsx` that shows a skeleton. Next.js automatically wraps the page in a Suspense boundary.

### Lazy Dialog Content

With compound components, the trigger always renders but the content can be lazy:

```tsx
const InviteMemberForm = lazy(() => import("./invite-member-form"));

<Dialog>
  <DialogTrigger asChild>
    <Button>Invite</Button>
  </DialogTrigger>
  <DialogContent>
    <Suspense fallback={<DialogSkeleton />}>
      <InviteMemberForm />
    </Suspense>
  </DialogContent>
</Dialog>
```

### Lazy Charts

Pages that include charts should lazy-load them, especially below the fold or behind tabs:

```tsx
import dynamic from "next/dynamic";

const EventsChart = dynamic(
  () => import("./events-chart").then(m => m.EventsChart),
  { loading: () => <ChartSkeleton /> }
);
```

## Antipatterns

### Inlined Static Asset

Hundreds of lines of SVG `<path>` elements. This bloats the JS bundle with static visual data. Use:
1. A CSS background pattern (`background: radial-gradient(...)`)
2. A programmatic SVG `<pattern>` element
3. A static `.svg` file loaded via `next/image`

### All Dialogs Loaded Eagerly

Every dialog/sheet is imported at the top of its parent, even though dialogs are only visible after interaction.

### Chart Libraries on Non-Chart Pages

Pages that import recharts/d3 at the top level when the chart is below the fold or behind a tab.

## Rules

1. **Route groups are split boundaries.** Each route group gets its own chunk.
2. **Dialogs/sheets: lazy content.** The trigger renders immediately; the content loads on open.
3. **Charts, editors, syntax highlighters: always lazy.** These are 50-200KB dependencies.
4. **`loading.tsx` for every async route.** Route-level Suspense boundaries prevent layout shifts.
5. **Parallel fetches in server components.** Use `Promise.all()` for independent data fetches.
6. **Static assets stay static.** SVGs, patterns, decorative elements should be files or CSS, not JSX.

## Measuring Impact

```bash
# Analyze bundle with Next.js
ANALYZE=true bun run build

# Check which chunks include heavy deps
rg "recharts|shiki|codemirror|reactflow" .next/static --type js -l
```

## Tradeoffs

- **Lazy loading adds complexity.** Don't lazy-load tiny components (< 5KB).
- **Sync data doesn't need Suspense.** Components using a local-first sync engine don't need Suspense for data.
- **Some eager loading is fine for critical paths.** The problem list, sidebar, header should load eagerly.
