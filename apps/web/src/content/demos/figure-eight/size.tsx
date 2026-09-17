import { FigureEight } from "loading-dev";

export default function FigureEightSize() {
  return (
    <div className="flex items-center gap-6">
      <FigureEight size={16} />
      <FigureEight size={24} />
      <FigureEight size={40} />
    </div>
  );
}
