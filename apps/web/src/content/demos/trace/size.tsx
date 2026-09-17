import { Trace } from "loading-dev";

export default function TraceSize() {
  return (
    <div className="flex items-center gap-6">
      <Trace size={16} />
      <Trace size={24} />
      <Trace size={40} />
    </div>
  );
}
