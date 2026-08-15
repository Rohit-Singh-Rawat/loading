import type { MDXModule } from "@/lib/mdx";

export async function Demo({ name }: { name: string }) {
  const [{ default: Example }, { default: Snippet }]: [MDXModule, MDXModule] =
    await Promise.all([
      import(`@/content/demos/${name}.tsx`),
      import(`@/content/demos/${name}.mdx`),
    ]);

  return (
    <div className="mt-8 w-full overflow-hidden rounded-2xl border border-border bg-background">
      <div className="flex min-h-36 items-center justify-center border-border border-b px-4 py-8">
        <Example />
      </div>
      <div className="[&>figure]:rounded-none [&>figure]:border-0">
        <Snippet />
      </div>
    </div>
  );
}
