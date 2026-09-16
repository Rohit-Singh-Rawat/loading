import { Atom } from "loading-dev";

export default function AtomSize() {
  return (
    <div className="flex items-center gap-6">
      <Atom size={16} />
      <Atom size={24} />
      <Atom size={40} />
    </div>
  );
}
