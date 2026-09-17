import { Eclipse } from "loading-dev";

export default function EclipseSize() {
  return (
    <div className="flex items-center gap-6">
      <Eclipse size={16} />
      <Eclipse size={24} />
      <Eclipse size={40} />
    </div>
  );
}
