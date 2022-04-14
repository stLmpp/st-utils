import type { ConditionalKeys } from 'type-fest';

export function sum(array: readonly number[]): number {
  return array.reduce((acc, item) => acc + item, 0);
}

export function sumBy<T extends Record<any, any>, K extends ConditionalKeys<T, number | null | undefined>>(
  array: readonly T[],
  key: K
): number {
  return array.reduce((acc, item) => acc + (item[key] ?? 0), 0);
}
