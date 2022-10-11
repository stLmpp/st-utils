import { ArrayCallback } from './type';

export function arrayRemove<T>(array: readonly T[] | null | undefined, predicate: ArrayCallback<T, unknown>): T[] {
  array ??= [];
  return array.filter((element, index, originalArray) => !predicate(element, index, originalArray));
}
