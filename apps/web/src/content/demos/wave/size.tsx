import { Wave } from "loading-dev";

export default function WaveSize() {
  return (
    <div className="flex items-center gap-6">
      <Wave size={16} />
      <Wave size={24} />
      <Wave size={40} />
    </div>
  );
}
