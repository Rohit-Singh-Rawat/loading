import { Dual } from "loading-dev";

export default function DualCap() {
  return (
    <div className="flex items-center gap-6">
      <Dual cap="round" size={32} />
      <Dual cap="flat" size={32} />
    </div>
  );
}
