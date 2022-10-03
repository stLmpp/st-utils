import { isNil } from './util';

export function iterableMaxBy(iterable: null | undefined, callback: any): null;
export function iterableMaxBy<T>(
  iterable: Iterable<T> | null | undefined,
  callback: (item: T) => number | null | undefined
): T | null;
export function iterableMaxBy<T>(
  iterable: Iterable<T> | null | undefined,
  callback: (item: T) => number | null | undefined
): T | null {
  if (isNil(iterable)) {
    return null;
  }
  const getter = (item: T): number => callback(item) ?? -Infinity;
  let maxItem: T | null = null;
  for (const item of iterable) {
    if (!maxItem || getter(item) > getter(maxItem)) {
      maxItem = item;
    }
  }
  return maxItem;
}
