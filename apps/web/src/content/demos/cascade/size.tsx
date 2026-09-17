import { Cascade } from "loading-dev";

export default function CascadeSize() {
  return (
    <div className="flex items-center gap-6">
      <Cascade size={16} />
      <Cascade size={24} />
      <Cascade size={40} />
    </div>
  );
}
