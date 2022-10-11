export function arraySum(array: readonly number[] | null | undefined): number {
  array ??= [];
  return array.reduce((acc, item) => acc + item, 0);
}
