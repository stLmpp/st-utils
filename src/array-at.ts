export function arrayAt<T>(array: T[], index: number): T | undefined {
  index = Math.trunc(index) || 0;
  if (index < 0) {
    index += array.length;
  }
  return array[index];
}
