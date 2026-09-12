import type { MDXModule } from "@/lib/mdx";

export async function Demo({ name, slug }: { name: string; slug: string }) {
  const [{ default: Example }, { default: Snippet }]: [MDXModule, MDXModule] =
    await Promise.all([
      import(`@/content/demos/${slug}/${name}.tsx`),
      import(`@/content/demos/${slug}/${name}.mdx`),
    ]);

  return (
    <div className="-mx-4 mt-8 overflow-hidden rounded-2xl bg-background-subtle [&>figure]:rounded-none [&>figure]:border-0 [&>figure]:bg-transparent">
      <div className="flex min-h-60 items-center justify-center rounded-2xl border border-border bg-surface p-1">
        <Example />
      </div>
      <Snippet />
    </div>
  );
}
