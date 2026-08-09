import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Philosophy",
};

export default function PhilosophyPage() {
  return <PageHeader description="Coming soon." title="Philosophy" />;
}
