import { Trace } from "loading-dev";

export default function TraceEasing() {
  return (
    <div className="flex items-center gap-6">
      <Trace easing="linear" size={32} />
      <Trace easing="ease-in-out" size={32} />
      <Trace easing="stacked" size={32} />
    </div>
  );
}
