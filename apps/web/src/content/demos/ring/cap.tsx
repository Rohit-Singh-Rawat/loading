import { Ring } from "loading-dev";

export default function RingCap() {
  return (
    <div className="flex items-center gap-6">
      <Ring cap="round" size={32} />
      <Ring cap="flat" size={32} />
    </div>
  );
}
