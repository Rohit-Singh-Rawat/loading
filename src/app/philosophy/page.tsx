import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Philosophy",
};

export default function PhilosophyPage() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-heldane text-[24px] leading-8">Philosophy</h1>
      <p className="text-[13px] text-gray-1000 leading-5">Coming soon.</p>
    </div>
  );
}
