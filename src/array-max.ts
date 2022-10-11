export function arrayMax(array: readonly number[] | null | undefined): number {
  if (!array) {
    return 0;
  }
  return Math.max(...array);
}
