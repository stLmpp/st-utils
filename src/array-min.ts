export function arrayMin(array: readonly number[] | null | undefined): number {
  array ??= [];
  return Math.min(...array);
}
