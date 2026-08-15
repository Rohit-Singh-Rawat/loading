import { Grid } from "loading-dev";

export default function GridSize() {
  return (
    <div className="flex items-center gap-6">
      <Grid size={16} />
      <Grid size={24} />
      <Grid size={40} />
    </div>
  );
}
