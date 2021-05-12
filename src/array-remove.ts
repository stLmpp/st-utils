export function arrayRemove<T>(array: T[], predicate: (element: T, index: number, array: T[]) => boolean): T[] {
  return array.filter((element, index, array1) => !predicate(element, index, array1));
}

export function arrayRemoveMutate<T>(array: T[], predicate: (element: T, index: number, array: T[]) => boolean): T[] {
  const removed: T[] = [];
  let index = array.length;
  while (index--) {
    if (predicate(array[index], index, array)) {
      removed.push(...array.splice(index, 1));
    }
  }
  return removed.reverse();
}
