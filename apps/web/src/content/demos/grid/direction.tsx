import { Grid } from "loading-dev";

export default function GridDirection() {
  return (
    <div className="flex items-center gap-6">
      <Grid direction="rows" size={32} />
      <Grid direction="columns" size={32} />
      <Grid direction="diagonal" size={32} />
    </div>
  );
}
