import { Fold } from "loading-dev";

export default function FoldSize() {
  return (
    <div className="flex items-center gap-6">
      <Fold size={16} />
      <Fold size={24} />
      <Fold size={40} />
    </div>
  );
}
