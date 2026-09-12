import { CircularDots } from "loading-dev";

export default function CircularDotsSize() {
  return (
    <div className="flex items-center gap-6">
      <CircularDots size={16} />
      <CircularDots size={24} />
      <CircularDots size={40} />
    </div>
  );
}
