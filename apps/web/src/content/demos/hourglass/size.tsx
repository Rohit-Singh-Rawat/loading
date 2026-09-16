import { Hourglass } from "loading-dev";

export default function HourglassSize() {
  return (
    <div className="flex items-center gap-6">
      <Hourglass size={16} />
      <Hourglass size={24} />
      <Hourglass size={40} />
    </div>
  );
}
