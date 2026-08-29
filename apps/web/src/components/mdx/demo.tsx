import type { MDXModule } from "@/lib/mdx";

export async function Demo({ name, slug }: { name: string; slug: string }) {
  const [{ default: Example }, { default: Snippet }]: [MDXModule, MDXModule] =
    await Promise.all([
      import(`@/content/demos/${slug}/${name}.tsx`),
      import(`@/content/demos/${slug}/${name}.mdx`),
    ]);

  return (
    <div className="mt-8 w-full overflow-hidden rounded-2xl border border-border">
      <div className="flex min-h-36 items-center justify-center border-border border-b bg-background-subtle px-4 py-8">
        <Example />
      </div>
      <div className="[&>figure]:rounded-none [&>figure]:border-0">
        <Snippet />
      </div>
    </div>
  );
}
