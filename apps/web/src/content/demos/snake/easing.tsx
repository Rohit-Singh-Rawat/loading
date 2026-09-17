import { Snake } from "loading-dev";

export default function SnakeEasing() {
  return (
    <div className="flex items-center gap-6">
      <Snake easing="linear" size={32} />
      <Snake easing="ease-in-out" size={32} />
      <Snake easing="stacked" size={32} />
    </div>
  );
}
