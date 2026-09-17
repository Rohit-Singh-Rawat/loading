import { Collapse } from "loading-dev";

export default function CollapseSize() {
  return (
    <div className="flex items-center gap-6">
      <Collapse size={16} />
      <Collapse size={24} />
      <Collapse size={40} />
    </div>
  );
}
