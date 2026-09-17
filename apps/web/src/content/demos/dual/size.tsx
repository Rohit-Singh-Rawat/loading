import { Dual } from "loading-dev";

export default function DualSize() {
  return (
    <div className="flex items-center gap-6">
      <Dual size={16} />
      <Dual size={24} />
      <Dual size={40} />
    </div>
  );
}
