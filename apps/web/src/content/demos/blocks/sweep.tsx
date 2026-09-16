import { Blocks } from "loading-dev";

export default function BlocksSweep() {
  return (
    <div className="flex items-center gap-6">
      <Blocks size={32} sweep="diagonal" />
      <Blocks size={32} sweep="rows" />
      <Blocks size={32} sweep="columns" />
    </div>
  );
}
