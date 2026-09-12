import { Orbit } from "loading-dev";

export default function OrbitEasing() {
  return (
    <div className="flex items-center gap-6">
      <Orbit easing="linear" size={32} />
      <Orbit easing="ease-in-out" size={32} />
      <Orbit easing="stacked" size={32} />
    </div>
  );
}
