import { Pulse } from "loading-dev";

export default function PulseSize() {
  return (
    <div className="flex items-center gap-6">
      <Pulse size={16} />
      <Pulse size={24} />
      <Pulse size={40} />
    </div>
  );
}
