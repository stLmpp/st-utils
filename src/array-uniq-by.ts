import { ArrayCallback } from './type';

export function arrayUniqBy<T>(array: readonly T[] | null | undefined, callback: ArrayCallback<T, unknown>): T[] {
  array ??= [];
  const map = new Map<unknown, T>();
  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    const key = callback(item, index, array);
    if (!map.has(key)) {
      map.set(key, item);
    }
  }
  return [...map.values()];
}
