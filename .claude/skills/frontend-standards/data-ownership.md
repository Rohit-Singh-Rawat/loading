# Data Ownership

## Ideal End State

Every component that renders data **owns its own data subscription**. Data flows through hooks, not props. A parent component's job is layout and composition — it renders children, it doesn't fetch data for them.

```
Page (server component)
  └─ Layout shell
       ├─ Sidebar ← useQuery(queries.list())
       ├─ Detail ← useQuery(queries.getById(id))
       │    ├─ Timeline ← useTimeline(id)
       │    ├─ AffectedUsers ← useAffectedUsers(id)
       │    └─ AssigneeSelector ← useQuery(queries.members.list())
       └─ Filters ← useQueryStates({ status, priority, assignee })
```

Each leaf fetches exactly what it needs. No data passes through intermediate components.

## Patterns

### Feature-Scoped Data Hooks

Each feature owns its data via co-located hooks:

```
feature/
  ├─ _components/
  ├─ data/
  │    ├─ list.ts          → useFeatureList()
  │    ├─ detail.ts        → useFeatureDetail()
  │    └─ count.ts         → useFeatureCount()
  └─ filters/
       ├─ search-filter.ts → useFeatureSearch() via nuqs
       ├─ tab-filter.ts    → useTabState() via nuqs
       └─ advanced-filter.ts → useAdvancedFilters() via nuqs
```

The data hook composes all filter state into its query key automatically:

```ts
export function useFeatureList() {
  const [search] = useFeatureSearch();
  const [filters] = useAdvancedFilters();
  const [tab] = useTabState();

  return useInfiniteQuery({
    queryKey: ["feature", { tab, search, ...filters }],
    queryFn: fetchFeatureList,
  });
}
```

When any filter changes, the query refetches. The list component just calls the hook and renders:

```tsx
function FeatureList() {
  const { data, fetchNextPage, hasNextPage } = useFeatureList();
  return data.pages.flatMap(page => page.items).map(item => (
    <FeatureRow key={item.id} item={item} />
  ));
}
```

### Server Components Fetch, Client Components Subscribe

Server components initiate data and pass it to providers. Client components consume via hooks:

```tsx
// page.tsx (server component)
export default async function FeaturePage({ params }) {
  const { slug } = await params;
  const promise = getFeatureData({ slug });

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

Children subscribe to what they need from the store — they don't receive data as props from the page.

## Antipatterns

### Parent Fetches, Children Render

The parent fetches data, enriches it, then passes the full array as props to pure-renderer children.

**Fix:** Create a shared hook that both components can call:

```ts
export function useEnrichedUsers() {
  const { data: users } = useQuery({ queryKey: ["users"], queryFn: fetchUsers });
  const { data: activity } = useQuery({ queryKey: ["activity"], queryFn: fetchActivity });
  return users?.map(user => ({ ...user, ...activity?.[user.id] }));
}
```

Each component imports the hook and applies its own filtering/sorting.

### Data Passed as Props Instead of IDs

A parent list selects an item and passes the entire object to a detail sheet. If the data updates, the sheet shows stale data until the parent re-renders.

**Fix:** Pass only the ID. The sheet subscribes to the item directly:

```tsx
function MemberSheet({ memberId }: { memberId: string | null }) {
  const { data: member } = useQuery({
    queryKey: ["member", memberId],
    queryFn: () => fetchMember(memberId!),
    enabled: !!memberId,
  });
  if (!member) return null;
  // ...
}
```

### Props Passing Through N Layers

A table component receives 9 props and passes 8 of them through to each row.

**Fix: Context provider**

```tsx
const FeatureContext = createContext<FeatureConfig>(null!);

function FeatureTable({ items, ...config }: FeatureTableProps) {
  return (
    <FeatureContext value={config}>
      {items.map(item => <FeatureRow key={item.id} item={item} />)}
    </FeatureContext>
  );
}

function FeatureRow({ item }: { item: ItemType }) {
  const { onLink, onUnlink, options } = use(FeatureContext);
  // ...
}
```

## Rules

1. **Components own their data.** If a component renders data, it subscribes via a hook. It does not receive data as a prop from a parent.
2. **Parents pass IDs, not objects.** When a child needs detail for a selected item, pass the ID. The child subscribes to the full object.
3. **Hooks compose filter state.** Data hooks consume filter state from URL hooks (`nuqs`) or context. The query key includes all relevant filters so the data layer refetches automatically.
4. **Co-locate data hooks with their feature.** A `data/` or `lib/` directory next to the feature's `components/` directory.
5. **Server components start fetches, client components subscribe.** In App Router, server components initiate fetches. Client components consume via `use()`, Suspense, or hydrated stores.
6. **Max 3 props for a component.** If more than 3 non-`children` props, question whether it should own its own data or use context.

## When Prop Drilling Is Acceptable

- **Pure layout components** (`<Card>`, `<Stack>`, `<Grid>`) that take `children` and styling props.
- **List item components** in a virtualized list where the list holds the data array for performance.
- **Form field components** that receive value + onChange from `react-hook-form`'s `Controller`.

## Tradeoffs

- **Sync engine queries are cheap.** If your data layer deduplicates subscriptions (React Query, or a local-first sync engine), having many independent subscriptions doesn't cost multiple network requests.
- **Async queries have loading states.** Components that fetch async data will have loading states. Co-locate loading UI with the data hook.
