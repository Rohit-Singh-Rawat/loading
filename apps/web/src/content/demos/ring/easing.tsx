import { Ring } from "loading-dev";

export default function RingEasing() {
  return (
    <div className="flex items-center gap-6">
      <Ring easing="linear" size={32} />
      <Ring easing="ease-in-out" size={32} />
      <Ring easing="stacked" size={32} />
    </div>
  );
}
