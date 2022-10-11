import { isNil } from './is-nil';

export function arrayGroupMap(iterable: null | undefined, callback: any): null;
export function arrayGroupMap<T, R>(iterable: readonly T[], callback: (item: T) => R): Map<R, T[]>;
export function arrayGroupMap<T, R>(
  iterable: readonly T[] | null | undefined,
  callback: (item: T) => R
): Map<R, T[]> | null;
export function arrayGroupMap<T, R>(
  iterable: readonly T[] | null | undefined,
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
