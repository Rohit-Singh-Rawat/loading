import { Arc } from "loading-dev";

export default function ArcCap() {
  return (
    <div className="flex items-center gap-6">
      <Arc cap="round" size={32} />
      <Arc cap="flat" size={32} />
    </div>
  );
}
