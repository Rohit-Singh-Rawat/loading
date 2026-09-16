import { Loading } from "loading-dev";

export default function LoadingSize() {
  return (
    <div className="flex items-center gap-6">
      <Loading size={16} />
      <Loading size={24} />
      <Loading size={40} />
    </div>
  );
}
