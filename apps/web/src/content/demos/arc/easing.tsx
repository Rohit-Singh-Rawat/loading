import { Arc } from "loading-dev";

export default function ArcEasing() {
  return (
    <div className="flex items-center gap-6">
      <Arc easing="linear" size={32} />
      <Arc easing="ease-in-out" size={32} />
      <Arc easing="stacked" size={32} />
    </div>
  );
}
