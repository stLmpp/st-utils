export function arrayRemove<T>(
  array: readonly T[],
  predicate: (element: T, index: number, array: T[] | readonly T[]) => boolean
): T[] {
  return array.filter((element, index, array1) => !predicate(element, index, array1));
}
