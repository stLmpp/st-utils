export function arrayRemove<T>(
  array: readonly T[],
  predicate: (element: T, index: number, array: readonly T[]) => boolean
): T[] {
  return array.filter((element, index, originalArray) => !predicate(element, index, originalArray));
}
