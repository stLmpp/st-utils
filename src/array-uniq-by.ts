import { isFunction } from './util';

export function arrayUniqBy<T extends Record<any, any>, K extends keyof T>(
  array: readonly T[],
  key: K | ((item: T) => T[K])
): T[] {
  const predicate = isFunction(key) ? key : (item: T) => item[key];
  const map = new Map<T[K], T>();
  for (const item of array) {
    const itemKey = predicate(item);
    if (!map.has(itemKey)) {
      map.set(itemKey, item);
    }
  }
  return [...map.values()];
}
