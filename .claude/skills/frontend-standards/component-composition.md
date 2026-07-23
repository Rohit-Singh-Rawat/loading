# Component Composition

## Ideal End State

Every component follows these rules:

- **50-150 lines max.** If a component file exceeds 150 lines, split it.
- **Compound components for anything with open/close state.** Dialogs, sheets, drawers, popovers, dropdowns use the Radix/shadcn compound pattern (`Root` / `Trigger` / `Content`). No `open`/`onOpenChange` props passed from parents.
- **`children` over render props.** If a component renders other components, it should accept `children`, not individual props for each slot.
- **Domain objects as props, not destructured fields.** If a component uses 3+ fields from the same object, pass the object. `<UserCard user={user} />` not `<UserCard name={user.name} email={user.email} avatar={user.avatar} />`.
- **Tiny leaf components.** Layout primitives, icon wrappers, label components are 5-15 lines. They do one thing.

## Patterns

### Tiny Leaf Components (5-15 lines)

```tsx
export function SidebarItemIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="size-5 [&>svg]:size-full [&>svg]:text-inherit">
      {children}
    </div>
  );
}

export function SidebarLabel({ children }: { children: React.ReactNode }) {
  return <span className="select-none text-sm font-medium">{children}</span>;
}
```

These compose together:

```tsx
<SidebarItem href="/settings">
  <SidebarItemIcon><SettingsIcon /></SidebarItemIcon>
  <SidebarLabel>Settings</SidebarLabel>
</SidebarItem>
```

Not:

```tsx
// ANTIPATTERN: god component with slots as props
<SidebarItem href="/settings" icon={<SettingsIcon />} label="Settings" />
```

### Compound Dialog Pattern

```tsx
export function AddMemberButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Team Members</DialogTitle>
        </DialogHeader>
        <SendInviteForm />
      </DialogContent>
    </Dialog>
  );
}
```

The dialog **owns its own open/close state** via Radix internals. The parent doesn't know or care about the dialog lifecycle.

If the dialog needs to be opened programmatically (e.g., from a table row click), use a selection pattern:

```tsx
const [selectedMember, setSelectedMember] = useState<string | null>(null);

<MemberDetailSheet memberId={selectedMember} onDismiss={() => setSelectedMember(null)}>
  {/* Sheet fetches its own data via the memberId */}
</MemberDetailSheet>
```

### CVA Variants Mapped to Domain Objects

```tsx
const msgVariants = cva(["grid items-center"], {
  variants: {
    sender: {
      USER: "grid-cols-[var(--majority),var(--minority)] place-items-start",
      AGENT: "grid-cols-[var(--minority),var(--majority)] place-items-end",
    },
  },
});

export function ChatMessage({ message, className, actions, ...props }: ChatMessageProps) {
  return (
    <motion.li className={msgVariants({ ...message, className })} layout {...props}>
      <ChatMessageContent message={message} actions={actions}>
        <MessageFormatter message={message} />
      </ChatMessageContent>
    </motion.li>
  );
}
```

The schema's `sender` field maps directly to the CVA variant key.

## Antipatterns

### `open`/`onOpenChange` Prop Drilling

A dialog/sheet receives `open: boolean` and `onOpenChange: (open: boolean) => void` from a parent that manages the state.

```tsx
// ANTIPATTERN
const [open, setOpen] = useState(false);
<InviteMemberDialog open={open} onOpenChange={setOpen} />

// FIX: compound component — dialog owns its state
<Dialog>
  <DialogTrigger asChild><Button>Invite</Button></DialogTrigger>
  <DialogContent><InviteMemberForm /></DialogContent>
</Dialog>
```

### Desktop/Mobile Component Duplication

Same business logic duplicated across `desktop/` and `mobile/` directories with only the container (Dialog vs Drawer) differing.

**Fix: Responsive container component**

```tsx
function ResponsiveDialog({ children, ...props }: DialogProps) {
  const isMobile = useIsMobile();
  const Container = isMobile ? Drawer : Dialog;
  return <Container {...props}>{children}</Container>;
}
```

### God Components (>200 lines)

A single file exceeds 200 lines, mixing multiple concerns. Fixes:
- **Inlined SVG path data:** Replace with SVG `<pattern>` element or static `.svg` import
- **Multiple sub-components + hooks in one file:** Split into separate files
- **Multiple dialogs + table CRUD in one component:** Each dialog becomes its own file

### Passing 8+ Props Through to Children

**Fix: Context or composition**

```tsx
<FeatureProvider options={options} onLink={onLink} onUnlink={onUnlink}>
  {items.map((item) => (
    <FeatureRow key={item.id} item={item} />
  ))}
</FeatureProvider>
```

## Rules

1. **50-150 lines per component.** Split if larger.
2. **Compound components for dialogs/sheets.** No `open`/`onOpenChange` prop drilling.
3. **`children` over render props.** Compose, don't configure.
4. **Domain objects as props.** Pass the object, not 5 fields from it.
5. **Max 3 non-`children` props.** If more, use composition or context.
6. **Responsive wrappers over mobile/desktop duplication.** One component, responsive container.

## Tradeoffs

- **Some dialogs need programmatic control.** The selection-based pattern (passing an ID + dismiss callback) is acceptable. The dialog still owns its data fetching.
- **Not every component can be 100 lines.** Complex chart components may exceed 150 lines. Test: can you explain what it does in one sentence?
- **Mobile/desktop divergence is sometimes necessary.** When interaction models genuinely differ, separate implementations are fine — but share business logic and data fetching.
