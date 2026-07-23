import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usage",
};

export default function UsagePage() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-heldane text-[24px] leading-8">Usage</h1>
      <p className="text-[13px] leading-5 text-gray-1000">Coming soon.</p>
    </div>
  );
}
