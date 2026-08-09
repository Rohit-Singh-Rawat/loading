import type { Metadata } from "next";

export function generatePageMetadata({
  title,
  description,
}: {
  title: string;
  description: string;
}): Metadata {
  return {
    description,
    title,
  };
}
