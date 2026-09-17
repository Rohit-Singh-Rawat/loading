import { Chase } from "loading-dev";

export default function ChaseSize() {
  return (
    <div className="flex items-center gap-6">
      <Chase size={16} />
      <Chase size={24} />
      <Chase size={40} />
    </div>
  );
}
