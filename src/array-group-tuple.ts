import { arrayGroupMap } from './array-group-map';

export function arrayGroupTuple<T, R>(array: readonly T[], callback: (item: T) => R): [R, T[]][];
export function arrayGroupTuple(array: null | undefined, callback: any): null;
export function arrayGroupTuple<T, R>(
  array: readonly T[] | null | undefined,
  callback: (item: T) => R
): [R, T[]][] | null;
export function arrayGroupTuple<T, R>(
  array: readonly T[] | null | undefined,
  callback: (item: T) => R
): [R, T[]][] | null {
  const map = arrayGroupMap(array, callback);
  return map && [...map];
}
