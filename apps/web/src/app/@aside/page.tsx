// The overview has no aside, but the slot still needs a segment matching "/":
// without one, navigating here from a spinner page would leave its TOC behind.
export default function AsideOverview() {
  return null;
}
