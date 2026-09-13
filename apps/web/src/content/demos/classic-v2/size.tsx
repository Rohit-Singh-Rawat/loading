import { ClassicV2 } from "loading-dev";

export default function ClassicV2Size() {
  return (
    <div className="flex items-center gap-6">
      <ClassicV2 size={16} />
      <ClassicV2 size={24} />
      <ClassicV2 size={40} />
    </div>
  );
}
