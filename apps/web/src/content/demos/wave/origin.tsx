import { Wave } from "loading-dev";

export default function WaveOrigin() {
  return (
    <div className="flex items-center gap-6">
      <Wave origin="center" size={32} />
      <Wave origin="bottom" size={32} />
    </div>
  );
}
