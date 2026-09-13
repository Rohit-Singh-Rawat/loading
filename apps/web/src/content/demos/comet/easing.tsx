import { Comet } from "loading-dev";

export default function CometEasing() {
  return (
    <div className="flex items-center gap-6">
      <Comet easing="linear" size={32} />
      <Comet easing="ease-in-out" size={32} />
      <Comet easing="stacked" size={32} />
    </div>
  );
}
