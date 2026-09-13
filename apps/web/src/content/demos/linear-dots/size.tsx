import { LinearDots } from "loading-dev";

export default function LinearDotsSize() {
  return (
    <div className="flex items-center gap-6">
      <LinearDots size={16} />
      <LinearDots size={24} />
      <LinearDots size={40} />
    </div>
  );
}
