import { Drive } from "loading-dev";

export default function DriveSize() {
  return (
    <div className="flex items-center gap-6">
      <Drive size={16} />
      <Drive size={24} />
      <Drive size={40} />
    </div>
  );
}
