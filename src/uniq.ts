export function uniq<T>(value: T[]): T[] {
  return [...new Set(value)];
}

export function uniqBy<T extends Record<any, any>, K extends keyof T>(array: T[], key: K): T[] {
  const map = new Map<T[K], T>();
  for (const item of array) {
    const itemKey = item[key];
    if (!map.has(itemKey)) {
      map.set(itemKey, item);
    }
  }
  return [...map.values()];
}

export function uniqWith<T>(array: T[], comparator: (valueA: T, valueB: T) => boolean): T[] {
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
