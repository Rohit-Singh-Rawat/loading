import { Radar } from "loading-dev";

export default function RadarSize() {
  return (
    <div className="flex items-center gap-6">
      <Radar size={16} />
      <Radar size={24} />
      <Radar size={40} />
    </div>
  );
}
