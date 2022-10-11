export function arrayMaxBy<T>(array: readonly T[], callback: (item: T) => number | null | undefined): T;
export function arrayMaxBy(array: null | undefined, callback: any): null;
export function arrayMaxBy<T>(
  array: readonly T[] | null | undefined,
  callback: (item: T) => number | null | undefined
): T | null;
export function arrayMaxBy<T>(
  array: readonly T[] | null | undefined,
  callback: (item: T) => number | null | undefined
): T | null {
  if (!array) {
    return null;
  }
  const getter = (item: T): number => callback(item) ?? -Infinity;
  return array.reduce((acc, item) => (getter(item) > getter(acc) ? item : acc), array[0]);
}
