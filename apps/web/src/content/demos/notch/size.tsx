import { Notch } from "loading-dev";

export default function NotchSize() {
  return (
    <div className="flex items-center gap-6">
      <Notch size={16} />
      <Notch size={24} />
      <Notch size={40} />
    </div>
  );
}
