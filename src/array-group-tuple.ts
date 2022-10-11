import { isNil } from './is-nil';
import { arrayGroupMap } from './array-group-map';

export function arrayGroupTuple(iterable: null | undefined, callback: any): null;
export function arrayGroupTuple<T, R>(
  iterable: readonly T[] | null | undefined,
  callback: (item: T) => R
): [R, T[]][] | null;
export function arrayGroupTuple<T, R>(iterable: readonly T[], callback: (item: T) => R): [R, T[]][];
export function arrayGroupTuple<T, R>(
  iterable: readonly T[] | null | undefined,
  callback: (item: T) => R
): [R, T[]][] | null {
  if (isNil(iterable)) {
    return null;
  }
  const map = arrayGroupMap(iterable, callback);
  return [...map];
}
