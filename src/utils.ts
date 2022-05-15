export function determineNumColumns(width: number, sizes: number[], columnGap: number): number {
  if (!width || !sizes || !sizes.length) {
    return 0;
  }
  let numColumns = sizes.length;
  while (numColumns > 0) {
    const startingArray = Array.from({ length: numColumns }, (_) => []);
    const proposedColumnTracks = sizes.reduce((acc, currItem, idx) => {
      acc[idx % numColumns].push(currItem);
      return acc;
    }, startingArray);
    const maxWidthPerProposedColumnTrack = proposedColumnTracks.map((track) => Math.max(...track));
    // skip final gap, only intermediate
    const totalGapWidth = (numColumns - 1) * columnGap;
    const totalWidthOfProposedColumns = maxWidthPerProposedColumnTrack.reduce((acc, curr) => acc + curr, totalGapWidth);
    if (totalWidthOfProposedColumns <= width) {
      return numColumns;
    }
    numColumns--;
  }
  throw Error("No columns can be made with these sizes in this width!");
}
