export function arrayAt<T>(array: readonly T[], index: number): T | undefined {
  index = Math.trunc(index) || 0;
  if (index < 0) {
    index += array.length;
  }
  return array[index];
}
