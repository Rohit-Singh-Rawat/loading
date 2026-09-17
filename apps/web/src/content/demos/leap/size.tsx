import { Leap } from "loading-dev";

export default function LeapSize() {
  return (
    <div className="flex items-center gap-6">
      <Leap size={16} />
      <Leap size={24} />
      <Leap size={40} />
    </div>
  );
}
