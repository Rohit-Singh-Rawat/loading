import { Swirl } from "loading-dev";

export default function SwirlSize() {
  return (
    <div className="flex items-center gap-6">
      <Swirl size={16} />
      <Swirl size={24} />
      <Swirl size={40} />
    </div>
  );
}
