import { Pendulum } from "loading-dev";

export default function PendulumPivot() {
  return (
    <div className="flex items-center gap-6">
      <Pendulum pivot="top" size={32} />
      <Pendulum pivot="bottom" size={32} />
    </div>
  );
}
