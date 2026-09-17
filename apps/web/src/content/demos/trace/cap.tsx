import { Trace } from "loading-dev";

export default function TraceCap() {
  return (
    <div className="flex items-center gap-6">
      <Trace cap="round" size={32} />
      <Trace cap="flat" size={32} />
    </div>
  );
}
