export function arrayMin(array: readonly number[] | null | undefined): number {
  if (!array) {
    return 0;
  }
  return Math.min(...array);
}
