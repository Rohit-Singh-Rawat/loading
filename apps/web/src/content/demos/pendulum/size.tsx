import { Pendulum } from "loading-dev";

export default function PendulumSize() {
  return (
    <div className="flex items-center gap-6">
      <Pendulum size={16} />
      <Pendulum size={24} />
      <Pendulum size={40} />
    </div>
  );
}
