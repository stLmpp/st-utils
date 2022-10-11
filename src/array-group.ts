import { ArrayCallback } from './type';

export type IterableGroupKeysType = string | number | symbol;

export function arrayGroup<T, R extends IterableGroupKeysType>(
  array: readonly T[],
  callback: ArrayCallback<T, R>
): Record<R, T[]>;
export function arrayGroup(array: null | undefined, callback: any): null;
export function arrayGroup<T, R extends IterableGroupKeysType>(
  array: readonly T[] | null | undefined,
  callback: ArrayCallback<T, R>
): Record<R, T[]> | null;
export function arrayGroup<T, R extends IterableGroupKeysType>(
  array: readonly T[] | null | undefined,
  callback: ArrayCallback<T, R>
): Record<R, T[]> | null {
  if (!array) {
    return null;
  }
  const object: Record<IterableGroupKeysType, T[]> = {};
  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    const key = callback(item, index, array);
    object[key] ??= [];
    object[key].push(item);
  }
  return object;
}
