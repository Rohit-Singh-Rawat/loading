import type { Metadata } from "next";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export const metadata: Metadata = {
  title: "Usage",
};

export default function UsagePage() {
  return (
    <div className="flex flex-col gap-5">
      <Heading as="h1" className="font-heldane" size={3} weight="regular">
        Usage
      </Heading>
      <Text className="text-gray-1000" size="sm">
        Coming soon.
      </Text>
    </div>
  );
}
