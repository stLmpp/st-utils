import { ArrayCallback } from './type';

export function arrayRemoveMutate<T>(array: T[] | null | undefined, predicate: ArrayCallback<T, unknown>): T[] {
  array ??= [];
  const removed: T[] = [];
  let index = array.length;
  while (index--) {
    if (predicate(array[index], index, array)) {
      removed.push(...array.splice(index, 1));
    }
  }
  return removed.reverse();
}
