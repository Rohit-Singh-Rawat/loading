import { Cascade } from "loading-dev";

export default function CascadeCap() {
  return (
    <div className="flex items-center gap-6">
      <Cascade cap="round" size={32} />
      <Cascade cap="flat" size={32} />
    </div>
  );
}
