import { Snake } from "loading-dev";

export default function SnakeSize() {
  return (
    <div className="flex items-center gap-6">
      <Snake size={16} />
      <Snake size={24} />
      <Snake size={40} />
    </div>
  );
}
