import { Ring } from "loading-dev";

export default function RingSize() {
  return (
    <div className="flex items-center gap-6">
      <Ring size={16} />
      <Ring size={24} />
      <Ring size={40} />
    </div>
  );
}
