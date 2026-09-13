import { Drive } from "loading-dev";

export default function DriveShape() {
  return (
    <div className="flex items-center gap-6">
      <Drive shape="square" size={32} />
      <Drive shape="circle" size={32} />
    </div>
  );
}
