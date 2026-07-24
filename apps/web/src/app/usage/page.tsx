import type { Metadata } from "next";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export const metadata: Metadata = {
  title: "Usage",
};

export default function UsagePage() {
  return (
    <div className="flex flex-col gap-5">
      <Heading as="h1" className="font-heldane" size={1} weight="regular">
        Usage
      </Heading>
      <Text className="text-text-paragraph" size="sm">
        Coming soon.
      </Text>
    </div>
  );
}
