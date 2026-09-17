import { Morph } from "loading-dev";

export default function MorphSize() {
  return (
    <div className="flex items-center gap-6">
      <Morph size={16} />
      <Morph size={24} />
      <Morph size={40} />
    </div>
  );
}
