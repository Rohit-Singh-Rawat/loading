# Form Patterns

## Ideal End State

Two form paradigms, chosen by interaction model. No manual `useState` for form fields anywhere.

| Paradigm | Tool | When |
|----------|------|------|
| **Submission forms** | `useForm` + `zodResolver` | Create, invite, configure — forms with a submit button |
| **Inline-editable fields** | Custom hook (save on blur) | Settings-style fields that save immediately |

## Submission Forms

### Standard Pattern

```tsx
export function useInviteForm({ onSuccess }: { onSuccess?: () => void }) {
  const formSchema = z.object({
    email: z.string().email("Invalid email"),
    role: z.enum(["member", "admin"]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", role: "member" },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    form.clearErrors("root");
    const result = await submitInvite(values);
    if (result.errors) {
      // Bridge server errors to form fields
      for (const [field, message] of Object.entries(result.errors)) {
        form.setError(field as any, { message });
      }
      return;
    }
    form.reset();
    onSuccess?.();
  });

  return { form, handleSubmit };
}
```

### Form UI Components

Always use form library primitives for consistent validation UX:

```tsx
<Form {...form}>
  <form onSubmit={handleSubmit}>
    <FormField control={form.control} name="email" render={({ field }) => (
      <FormItem>
        <FormControl>
          <Input {...field} placeholder="Email address" />
        </FormControl>
        <FormDescription>They'll receive an invitation email.</FormDescription>
        <FormMessage />
      </FormItem>
    )} />
    <Button type="submit">Send Invite</Button>
  </form>
</Form>
```

`FormMessage` automatically renders validation errors from both client-side Zod validation and server-side error bridging.

### Dynamic Zod Refinement

When validation depends on live data (e.g., checking for duplicates), build the schema reactively:

```ts
const formSchema = useMemo(() =>
  z.object({
    email: z.string().email().refine(
      (email) => !existingEmails.includes(email),
      "This email is already a member"
    ),
  }),
  [existingEmails]
);
```

## Inline-Editable Fields

For settings-style fields that save immediately on blur, build a hook that:
1. Tracks local input value
2. Validates on blur
3. Fires the mutation on valid blur
4. Reverts on second consecutive invalid blur

```tsx
function SettingsNameField({ currentName }: { currentName: string }) {
  const field = useLiveField(currentName, updateName, {
    validate: (v) => v.trim().length > 0 || "Name cannot be empty",
  });

  return (
    <Input
      value={field.value}
      onChange={(e) => field.onChange(e.target.value)}
      onBlur={field.onBlur}
      aria-invalid={field.error !== null}
    />
  );
}
```

## Rules

1. **No `useState` for form fields.** Use `useForm` for submission forms, a live-field hook for inline editing.
2. **Always `clearErrors("root")` before submitting.** Prevents stale root-level errors from persisting.
3. **Bridge server errors to form fields.** Map server validation errors to `form.setError()` calls.
4. **Zod schemas for validation.** Use `zodResolver`. Never write manual validation logic.
5. **Dynamic schemas via `useMemo`.** When validation depends on live data, rebuild the schema reactively.
6. **`FormMessage` for all error display.** Never manually render error strings.
7. **Separate hook from component.** Forms with complex logic go in a `use-feature-form.ts` hook. The component just renders.

**Incorrect:**

```tsx
const [email, setEmail] = useState("");
const [emailError, setEmailError] = useState<string | null>(null);

function handleSubmit() {
  if (!email.includes("@")) {
    setEmailError("Invalid email");
    return;
  }
}
```

**Correct:** Use `useForm` with `zodResolver` as shown above.
