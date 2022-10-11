import { isNull } from './is-null';

export function arrayMinBy<T>(
  array: readonly T[] | null | undefined,
  callback: (item: T) => number | null | undefined
): T | null {
  if (!array) {
    return null;
  }
  const getter = (item: T): number => callback(item) ?? Infinity;
  return array.reduce((acc: T | null, item) => {
    if (isNull(acc)) {
      return item;
    }
    return getter(item) < getter(acc) ? item : acc;
  }, null);
}
