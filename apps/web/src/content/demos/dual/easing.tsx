import { Dual } from "loading-dev";

export default function DualEasing() {
  return (
    <div className="flex items-center gap-6">
      <Dual easing="linear" size={32} />
      <Dual easing="ease-in-out" size={32} />
      <Dual easing="stacked" size={32} />
    </div>
  );
}
