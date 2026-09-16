import { Blocks } from "loading-dev";

export default function BlocksSize() {
  return (
    <div className="flex items-center gap-6">
      <Blocks size={16} />
      <Blocks size={24} />
      <Blocks size={40} />
    </div>
  );
}
