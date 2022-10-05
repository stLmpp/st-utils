import { isNil } from './util';

/**
 * @public
 */
export function iterableGroupMap(
  iterable: null | undefined,
  callback: any
): null;
export function iterableGroupMap<T, R>(
  iterable: Iterable<T>,
  callback: (item: T) => R
): Map<R, T[]>;
export function iterableGroupMap<T, R>(
  iterable: Iterable<T> | null | undefined,
  callback: (item: T) => R
): Map<R, T[]> | null;
export function iterableGroupMap<T, R>(
  iterable: Iterable<T> | null | undefined,
  callback: (item: T) => R
): Map<R, T[]> | null {
  if (isNil(iterable)) {
    return null;
  }
  const map = new Map<R, T[]>();
  for (const item of iterable) {
    const key = callback(item);
    const items = map.get(key) ?? [];
    items.push(item);
    map.set(key, items);
  }
  return map;
}
