import { Ellipsis } from "loading-dev";

export default function EllipsisSize() {
  return (
    <div className="flex items-center gap-6">
      <Ellipsis size={16} />
      <Ellipsis size={24} />
      <Ellipsis size={40} />
    </div>
  );
}
