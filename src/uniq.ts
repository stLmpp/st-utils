export function uniq<T = any>(value: T[]): T[] {
  return [...new Set(value)];
}

export function uniqBy<T = any>(value: T[], key: keyof T): T[] {
  return [
    ...value
      .reduce((map, item) => {
        if (!map.has(item[key])) {
          map.set(item[key], item);
        }
        return map;
      }, new Map())
      .values(),
  ];
}
