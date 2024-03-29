import { isFunction } from './util';

export function uniq<T>(value: readonly T[]): T[] {
  return [...new Set(value)];
}

export function uniqBy<T extends Record<any, any>, K extends keyof T>(array: readonly T[], key: K | ((item: T) => T[K])): T[] {
  const predicate = isFunction(key) ? key : (item: T) => item[key];
  const map = new Map<T[K], T>();
  for (const item of array) {
    const itemKey = predicate(item);
    if (!map.has(itemKey)) {
      map.set(itemKey, item);
    }
  }
  return [...map.values()];
}

export function uniqWith<T>(array: readonly T[], comparator: (valueA: T, valueB: T) => boolean): T[] {
  const set = new Set<number>();
  const len = array.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      const valueA = array[i];
      const valueB = array[j];
      if (comparator(valueA, valueB)) {
        set.add(i);
        break;
      }
    }
  }
  return array.filter((_, index) => !set.has(index));
}
