import { Clock } from "loading-dev";

export default function ClockSize() {
  return (
    <div className="flex items-center gap-6">
      <Clock size={16} />
      <Clock size={24} />
      <Clock size={40} />
    </div>
  );
}
