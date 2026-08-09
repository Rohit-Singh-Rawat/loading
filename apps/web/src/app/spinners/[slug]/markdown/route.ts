import { SPINNER_ITEMS } from "@/components/spinners";
import { getSpinnerMarkdown } from "@/lib/spinner-markdown";

export function generateStaticParams(): { slug: string }[] {
  return SPINNER_ITEMS.filter((item) => item.hasDocs).map(({ slug }) => ({
    slug,
  }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const markdown = await getSpinnerMarkdown(slug);

  if (markdown === null) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
