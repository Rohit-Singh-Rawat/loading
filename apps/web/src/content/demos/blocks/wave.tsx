import { Blocks } from "loading-dev";

export default function BlocksWave() {
  return (
    <div className="flex items-center gap-6">
      <Blocks size={32} wave="diagonal" />
      <Blocks size={32} wave="rows" />
      <Blocks size={32} wave="columns" />
    </div>
  );
}
