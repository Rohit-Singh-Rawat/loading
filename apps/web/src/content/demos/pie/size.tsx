import { Pie } from "loading-dev";

export default function PieSize() {
  return (
    <div className="flex items-center gap-6">
      <Pie size={16} />
      <Pie size={24} />
      <Pie size={40} />
    </div>
  );
}
