import { Compass } from "loading-dev";

export default function CompassSize() {
  return (
    <div className="flex items-center gap-6">
      <Compass size={16} />
      <Compass size={24} />
      <Compass size={40} />
    </div>
  );
}
