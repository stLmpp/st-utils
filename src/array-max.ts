export function arrayMax(array: readonly number[] | null | undefined): number {
  array ??= [];
  return Math.max(...array);
}
