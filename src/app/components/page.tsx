import type { Metadata } from "next";
import { SpinnerCard } from "@/components/spinner-card";
import { SPINNER_ITEMS } from "@/components/spinners";

export const metadata: Metadata = {
  title: "Components",
};

export default function ComponentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heldane text-[24px] leading-8">Components</h1>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {SPINNER_ITEMS.filter((item) => item.component).map((item) => (
          <SpinnerCard item={item} key={item.slug} />
        ))}
      </div>
    </div>
  );
}
