import type { Metadata } from "next";
import { SpinnerCard } from "@/components/spinner-card/spinner-card";
import { SPINNER_ITEMS } from "@/components/spinners";
import { Heading } from "@/components/ui/heading";

export const metadata: Metadata = {
  title: "Components",
};

export default function ComponentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <Heading as="h1" className="font-heldane" size={3} weight="regular">
        Components
      </Heading>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {SPINNER_ITEMS.filter((item) => item.component).map((item) => (
          <SpinnerCard item={item} key={item.slug} />
        ))}
      </div>
    </div>
  );
}
