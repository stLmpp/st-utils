import { isNil } from './util';

/**
 * @public
 */
export type IterableGroupKeysType = string | number | symbol;

/**
 * @public
 */
export function iterableGroup(iterable: null | undefined, callback: any): null;
export function iterableGroup<T, R extends IterableGroupKeysType>(
  iterable: Iterable<T> | null | undefined,
  callback: (item: T) => R
): Record<R, T[]> | null;
export function iterableGroup<T, R extends IterableGroupKeysType>(
  iterable: Iterable<T>,
  callback: (item: T) => R
): Record<R, T[]>;
export function iterableGroup<T, R extends IterableGroupKeysType>(
  iterable: Iterable<T> | null | undefined,
  callback: (item: T) => R
): Record<R, T[]> | null {
  if (isNil(iterable)) {
    return null;
  }
  const object: Record<IterableGroupKeysType, T[]> = {};
  for (const item of iterable) {
    const key = callback(item);
    object[key] ??= [];
    object[key].push(item);
  }
  return object;
}
