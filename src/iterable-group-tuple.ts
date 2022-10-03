import { isNil } from './util';
import { iterableGroupMap } from './iterable-group-map';

export function iterableGroupTuple(iterable: null | undefined, callback: any): null;
export function iterableGroupTuple<T, R>(
  iterable: Iterable<T> | null | undefined,
  callback: (item: T) => R
): [R, T[]][] | null;
export function iterableGroupTuple<T, R>(iterable: Iterable<T>, callback: (item: T) => R): [R, T[]][];
export function iterableGroupTuple<T, R>(
  iterable: Iterable<T> | null | undefined,
  callback: (item: T) => R
): [R, T[]][] | null {
  if (isNil(iterable)) {
    return null;
  }
  const map = iterableGroupMap(iterable, callback);
  return [...map];
}
