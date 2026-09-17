import { Flip } from "loading-dev";

export default function FlipSize() {
  return (
    <div className="flex items-center gap-6">
      <Flip size={16} />
      <Flip size={24} />
      <Flip size={40} />
    </div>
  );
}
