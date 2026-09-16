import { Atom } from "loading-dev";

export default function AtomEasing() {
  return (
    <div className="flex items-center gap-6">
      <Atom easing="linear" size={32} />
      <Atom easing="ease-in-out" size={32} />
      <Atom easing="stacked" size={32} />
    </div>
  );
}
