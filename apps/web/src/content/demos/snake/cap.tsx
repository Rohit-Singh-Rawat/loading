import { Snake } from "loading-dev";

export default function SnakeCap() {
  return (
    <div className="flex items-center gap-6">
      <Snake cap="round" size={32} />
      <Snake cap="flat" size={32} />
    </div>
  );
}
