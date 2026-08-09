import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Usage",
};

export default function UsagePage() {
  return <PageHeader description="Coming soon." title="Usage" />;
}
