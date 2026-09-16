import { Ripple } from "loading-dev";

export default function RippleDirection() {
  return (
    <div className="flex items-center gap-6">
      <Ripple direction="out" size={32} />
      <Ripple direction="in" size={32} />
    </div>
  );
}
