# State Management

## Ideal End State

Every piece of state has exactly one home. There's a clear hierarchy:

| Priority | State Type | Tool | Example |
|----------|-----------|------|---------|
| 1 | **URL state** | `nuqs` | Filters, search, selected item, active tab, pagination |
| 2 | **Server/synced state** | React Query, sync engine | All database-backed entities |
| 3 | **Form state** | `react-hook-form` + Zod | All form inputs, validation, submission |
| 4 | **Component-local state** | `useState` / `useReducer` | Hover state, animation state, dropdown open, transient UI |

If state doesn't fit in 1-3, question whether it needs to exist at all before reaching for 4.

**No global stores for data that has a URL or server representation.** No Zustand, no Jotai, no Redux for entity data. Your data layer is the state manager. The URL is the filter state.

## React Compiler: No Manual Memoization

With React Compiler enabled, the compiler automatically memoizes components, hooks, and expressions:

- **No `useMemo` for performance.** The compiler handles it. Just write plain expressions.
- **No `useCallback` for performance.** The compiler memoizes callbacks automatically.
- **No `React.memo`.** The compiler optimizes re-renders without wrapper components.

**The only exception** is **semantic stability** — reference equality that external code depends on:

```ts
// OK: stable callback for a third-party subscription API that checks reference equality
const handler = useCallback(() => { ... }, [dep]);
thirdPartyLib.subscribe(handler);

// OK: stable object stored in a Map/Set/ref where identity matters
const config = useMemo(() => ({ ... }), [dep]);
cache.set(key, config);
```

If you're using `useMemo`/`useCallback` purely to avoid re-renders, remove it.

**Incorrect:**

```tsx
const filteredUsers = useMemo(() => users.filter(u => u.active), [users]);
const handleClick = useCallback(() => setOpen(true), []);
const MemoizedChild = React.memo(ChildComponent);
```

**Correct:**

```tsx
const filteredUsers = users.filter(u => u.active);
const handleClick = () => setOpen(true);
// Just use ChildComponent directly
```

## URL State with `nuqs`

Every filter, search query, and selection is in the URL:

```ts
export function useFeatureSearch() {
  return useQueryState("search", parseAsString.withDefault("").withOptions({
    shallow: false,
    throttleMs: 1000,
    clearOnDefault: true,
  }));
}

export function useActiveItem() {
  return useQueryState("item_id", parseAsString.withOptions({ shallow: true }));
}

export function useAdvancedFilters() {
  return useQueryStates({
    unanswered: parseAsBoolean.withOptions({ clearOnDefault: true }),
    notifications: parseAsBoolean.withOptions({ clearOnDefault: true }),
    saved: parseAsBoolean.withOptions({ clearOnDefault: true }),
  });
}
```

Benefits:
- Shareable via URL
- Survives page refresh
- Browser back/forward works
- No state synchronization bugs
- `clearOnDefault: true` keeps URLs clean

## Antipatterns

### `useState` for Filter/Selection State

Components that use `useState` for state that should be in the URL. Loses state on refresh, can't share URL.

**Fix:**

```ts
const [selectedMemberId, setSelectedMemberId] = useQueryState("member", parseAsString);
```

### Derived State in useState + useEffect

```tsx
// ANTIPATTERN
const [filteredUsers, setFilteredUsers] = useState(users);
useEffect(() => {
  setFilteredUsers(users.filter(u => u.name.includes(search)));
}, [users, search]);
```

**Fix: Derive during render**

```tsx
const filteredUsers = users.filter(u => u.name.includes(search));
```

The React Compiler handles memoization. Don't manage derived state manually.

### Multiple useState Hooks for Related State

```tsx
// ANTIPATTERN
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<Error | null>(null);
const [data, setData] = useState<Data | null>(null);
```

**Fix:** This is what React Query does:

```tsx
const { data, error, isPending } = useQuery(/* ... */);
```

### Synced Data Cached in Local State

Copying query results into local state breaks the reactive chain and causes stale data.

```tsx
// ANTIPATTERN
const { data: items } = useQuery(/* ... */);
const [cachedItems, setCachedItems] = useState(items);
useEffect(() => { setCachedItems(items); }, [items]);
```

**Fix:** Use the query result directly.

## Rules

1. **URL first.** If state should survive refresh or be shareable, it goes in the URL via `nuqs`.
2. **Data layer for entities.** All database-backed data flows through your data layer (React Query, sync engine, etc.). No local caches.
3. **Forms use react-hook-form.** No manual `useState` for form fields.
4. **Derive, don't sync.** Compute values from props/state during render. No `useEffect` + `useState` for derived state.
5. **Max 3 `useState` per component.** If more, extract a custom hook or rethink the state design.
6. **No global stores for entity data.** Your data layer is the state manager. Global stores are only for truly local, transient UI state.
7. **No manual memoization** (with React Compiler). Remove `useMemo`/`useCallback`/`React.memo` used purely for performance.

## Tradeoffs

- **URL state has a serialization cost.** Complex objects need custom parsers in `nuqs`. Worth it for the UX benefits.
- **React Query cache can go stale.** For real-time data, use a sync engine. For analytics where seconds of staleness is acceptable, React Query is fine.
