import { Gather } from "loading-dev";

export default function GatherSize() {
  return (
    <div className="flex items-center gap-6">
      <Gather size={16} />
      <Gather size={24} />
      <Gather size={40} />
    </div>
  );
}
