import { Radar } from "loading-dev";

export default function RadarEasing() {
  return (
    <div className="flex items-center gap-6">
      <Radar easing="linear" size={32} />
      <Radar easing="ease-in-out" size={32} />
      <Radar easing="stacked" size={32} />
    </div>
  );
}
