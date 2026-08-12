import { SPINNER_ITEMS } from "@/components/spinners";
import { getSpinnerDocument } from "@/lib/spinner-markdown";

export function generateStaticParams(): { slug: string }[] {
  return SPINNER_ITEMS.map(({ slug }) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const document = await getSpinnerDocument(slug);

  if (!document) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(document.markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
