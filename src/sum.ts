import type { ConditionalKeys } from 'type-fest';

export function sum(array: number[]): number {
  return array.reduce((acc, item) => acc + item, 0);
}

export function sumBy<T extends Record<any, any>, K extends ConditionalKeys<T, number | null | undefined>>(
  array: T[],
  key: K
): number {
  return array.reduce((acc, item) => acc + (item[key] ?? 0), 0);
}
