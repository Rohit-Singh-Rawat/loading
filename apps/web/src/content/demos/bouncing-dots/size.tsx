import { BouncingDots } from "loading-dev";

export default function BouncingDotsSize() {
  return (
    <div className="flex items-center gap-6">
      <BouncingDots size={16} />
      <BouncingDots size={24} />
      <BouncingDots size={40} />
    </div>
  );
}
