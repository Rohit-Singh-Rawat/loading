import { Clock } from "loading-dev";

export default function ClockEasing() {
  return (
    <div className="flex items-center gap-6">
      <Clock easing="linear" size={32} />
      <Clock easing="ease-in-out" size={32} />
      <Clock easing="stacked" size={32} />
    </div>
  );
}
