export function arraySum(array: readonly number[]): number {
  return array.reduce((acc, item) => acc + item, 0);
}
