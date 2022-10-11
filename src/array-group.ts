import { isNil } from './is-nil';

export type IterableGroupKeysType = string | number | symbol;

export function arrayGroup(iterable: null | undefined, callback: any): null;
export function arrayGroup<T, R extends IterableGroupKeysType>(
  iterable: readonly T[] | null | undefined,
  callback: (item: T) => R
): Record<R, T[]> | null;
export function arrayGroup<T, R extends IterableGroupKeysType>(
  iterable: readonly T[],
  callback: (item: T) => R
): Record<R, T[]>;
export function arrayGroup<T, R extends IterableGroupKeysType>(
  iterable: readonly T[] | null | undefined,
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
