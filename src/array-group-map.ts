import { ArrayCallback } from './type';

export function arrayGroupMap<T, R>(array: readonly T[], callback: ArrayCallback<T, R>): Map<R, T[]>;
export function arrayGroupMap(array: null | undefined, callback: any): null;
export function arrayGroupMap<T, R>(
  array: readonly T[] | null | undefined,
  callback: ArrayCallback<T, R>
): Map<R, T[]> | null;
export function arrayGroupMap<T, R>(
  array: readonly T[] | null | undefined,
  callback: ArrayCallback<T, R>
): Map<R, T[]> | null {
  if (!array) {
    return null;
  }
  const map = new Map<R, T[]>();
  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    const key = callback(item, index, array);
    const items = map.get(key) ?? [];
    items.push(item);
    map.set(key, items);
  }
  return map;
}
