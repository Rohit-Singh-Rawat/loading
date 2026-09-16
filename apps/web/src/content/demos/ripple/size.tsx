import { Ripple } from "loading-dev";

export default function RippleSize() {
  return (
    <div className="flex items-center gap-6">
      <Ripple size={16} />
      <Ripple size={24} />
      <Ripple size={40} />
    </div>
  );
}
