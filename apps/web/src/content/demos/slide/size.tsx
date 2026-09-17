import { Slide } from "loading-dev";

export default function SlideSize() {
  return (
    <div className="flex items-center gap-6">
      <Slide size={16} />
      <Slide size={24} />
      <Slide size={40} />
    </div>
  );
}
